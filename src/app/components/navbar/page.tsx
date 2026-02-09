import Link from "next/link";
import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/src/app/actions/action";
import Image from "next/image";
export default async function Navbar() {
    const session = await auth();
    const user = await getCurrentUser();
    async function handleSignOut() {
        "use server";
        await signOut();
        redirect("/login");
    }
    return (<div className="navbar border-2 w-full p-4 flex justify-between items-center">
        <Link href="/">Home</Link>
        <div className="leftArea flex items-center gap-4">

            {!session && <div className="signArea flex gap-4">
                            
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>}
            {
                session && <div className="signArea flex gap-4">
                    <Link href="/profile">
          <Image src={user?.avatar?.length && user.avatar.length > 80 ? user.avatar : "/default_profile.png"} alt="avatar" width={60} height={60}  className="rounded-full" unoptimized /></Link>
                     <form action={handleSignOut}>
                    <button type="submit">Sign Out</button>
                </form>   </div>

            }
        </div>


    </div>)
}