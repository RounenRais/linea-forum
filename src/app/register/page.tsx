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
        <div className="flex min-h-screen  items-center justify-center bg-zinc-50 font-sans dark:bg-gray-500">
            <form action={handleRegister}>
                <div className="formItems flex flex-col gap-8">
                <input className="border-2 border-white p-2" type="text" name="name" placeholder="Name" />
                <input className="border-2 border-white p-2" type="email" name="email" placeholder="Email" />
                <input className="border-2 border-white p-2" type="password" name="password" placeholder="Password" />
                <button type="submit" className="bg-sky-300 p-2">Register</button></div>
            </form>
            </div>
    );
}