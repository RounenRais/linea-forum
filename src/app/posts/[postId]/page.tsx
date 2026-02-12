import {db} from "@/src/index"
import { commentsTable, postsTable, usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";
export default async function Post({params}: {params:{postId: string}}) {

const {postId} =await params;

const id= parseInt(postId);
    async function addComment(formData: FormData) {
        "use server"
        const comment = String(formData.get("comment") ?? "");
        if (!comment) return;
        if(!await auth()){
            redirect("/login")
        }
        await db.insert(commentsTable).values({
            content: comment.trim(),
            postId: (id),   
            authorId: await (await auth())?.user?.id || "Unknown"
        })
        revalidatePath(`/posts/${id}`)

    }
const post = await db.select().from(postsTable).where(eq(postsTable.id,id))
const comments = await db.select().from(commentsTable).where(eq(commentsTable.postId, id))
async function getAuthorName(authorId: string) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, parseInt(authorId))).then(res => res[0]);
    return user ? user.name : "Unknown";
}
    return(
        <div>
            <h1 className="text-3xl font-bold mb-4">{post[0].title}</h1>
            <p>{post[0].content}</p>
            <div className="comments">  
                <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
{comments.map(item=>(
    <div key={item.id} className="border-2 border-gray-300 rounded p-4 mb-4 text-black">
        <p>{item.content}</p>
        <p className="text-sm text-gray-500">Author: {getAuthorName(item.authorId)}</p>
    </div>
))}
            </div>
                  <div className="addComment">
        <form action={addComment}>
          <textarea  name="comment" placeholder="Add a comment..." className="border-2 p-2 w-full max-w-3xl" />
          <button className="bg-sky-300 p-2 text-black" type="submit">
            Add Comment
          </button>
        </form>
      </div>
        </div>
    )
}