import { auth } from "@/auth";
import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {signOut} from "@/auth";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function Dashboard() {

  const session = await auth();
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;

  const user = currentUserId
    ? await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, currentUserId))
        .limit(1)
        .then((r) => r[0])
    : null;

  async function handleFileUpload(formData: FormData) {
    "use server";
    
    // ✅ Session'ı action içinde tekrar al
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;
    
    if (!userId) {
      console.log("❌ No user ID in session");
      return;
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      console.log("❌ No file uploaded");
      return;
    }

    console.log("📁 File received:", file.name, file.size, file.type);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;

      console.log("🔄 Updating avatar for user:", userId);
      console.log("📊 Data URL length:", dataUrl.length);

      await db
        .update(usersTable)
        .set({ avatar: dataUrl })
        .where(eq(usersTable.id, userId));

      console.log("✅ Avatar updated in DB");
      
      // DB'den kontrol et
      const updatedUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1)
        .then((r) => r[0]);
      
      console.log("🔍 Avatar in DB:", updatedUser?.avatar?.substring(0, 50));
      
      revalidatePath("/dashboard");
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Email: {session?.user?.email ?? "Not logged in"}</p>

      <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "20px" }}  className="flex flex-col">
        <h2>Avatar</h2>
        
        <form action={handleFileUpload} className="flex flex-col gap-4 items-start justify-start">
          <input type="file" name="file" accept="image/*" />
          <button type="submit">Set Avatar</button>
        </form>

        <div style={{ marginTop: "20px" }}>
          {user?.avatar && (
            <>
              <Image src={user.avatar} alt="avatar" width={100} height={100} style={{ border: "2px solid green" }} />
  
            </>
      
          )}
        </div>
      </div>
    </div>
  );
}