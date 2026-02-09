import { signIn } from "@/auth";
import { redirect } from "next/navigation";
export default function Login() {
    async function handleLogin(formData: FormData) {
        "use server"
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) return;
        await signIn("credentials", { email, password, redirect: false })
        redirect("/")
    }
    return(
                <div className="flex min-h-screen  items-center justify-center bg-zinc-50 font-sans dark:bg-gray-500">

    <form action={handleLogin} >
   <div className="formItems flex flex-col gap-8 justify-center text-white  ">
                <input className="border-2 border-white p-2 " type="email" name="email" placeholder="Email" />
                <input className="border-2 border-white p-2" type="password" name="password" placeholder="Password" />
                <button type="submit" className="bg-sky-300 p-2 text-black">Login</button></div>
    </form>  
    </div>
     )   
   
}   