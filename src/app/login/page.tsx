import { signIn } from "@/auth";
import { redirect } from "next/navigation";
export default function Login() {
    async function handleLogin(formData: FormData) {
        "use server"
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) return;
        await signIn("credentials", { email, password, redirect: false })
        redirect("/dashboard")
    }
    return(
    <form action={handleLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>   
     )   
   
}   