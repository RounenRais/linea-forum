import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
export default function Register() {
    async function handleRegister(formData: FormData) {
        "use server"
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!name || !email || !password) return;
        await db.insert(usersTable).values({ name, email, password: hashedPassword })
        redirect("/login")
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <form action={handleRegister}>
                <input type="text" name="name" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            </div>
    );
}