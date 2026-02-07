import { auth } from "@/auth"
import Link from "next/link";
import {signOut} from "@/auth";
import { redirect } from "next/navigation";
export default async function Navbar() {
        async function handleSignOut() {
        "use server";
        await signOut();
        redirect("/login");
    }
    const session = await auth();
    return (<div className="navbar border-2 w-full p-4 flex justify-between">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {!session && <div className="signArea flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </div>}
               {
                session && <div className="signArea flex gap-4"> <form action={handleSignOut}>
          <button type="submit">Sign Out</button>
        </form>   </div>
               }
 

    </div>)
}