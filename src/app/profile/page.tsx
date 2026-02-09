import { auth } from "@/auth";
import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { getCurrentUser } from "@/src/app/actions/action";
export const dynamic = "force-dynamic";

export default async function Profile() {
  const user = await getCurrentUser();

  async function handleFileUpload(formData: FormData) {
    "use server";

    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;
    if (!userId) return;

    const file = formData.get("file");
    if (!(file instanceof File)) return;

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64.replace(/\s/g, "")}`;

    await db
      .update(usersTable)
      .set({ avatar: dataUrl })
      .where(eq(usersTable.id, userId));

    revalidatePath("/profile"); // ✅ doğru sayfa
  }

  return (
<div className="min-h-screen bg-zinc-50 dark:bg-black">
  <div className="mx-auto max-w-xl px-6 py-12">
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Choose your avatar
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Upload a profile photo. JPG/PNG works best.
          </p>
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
            Email: <span className="font-medium">{user?.email ?? "Not logged in"}</span>
          </p>
        </div>

        <div className="shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800">
            <Image
              src={
                user?.avatar && user.avatar.length > 80
                  ? user.avatar
                  : "/default_profile.png"
              }
              alt="avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <form action={handleFileUpload} className="space-y-4">
          <div className="rounded-xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Select an image
                </p>      
              </div>
              <span className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                Choose file
              </span>                
              <input
                type="file"
                name="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Save avatar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  );

}
