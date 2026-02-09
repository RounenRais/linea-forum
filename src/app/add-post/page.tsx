import {db} from "@/src/index";
import { postsTable } from "@/src/db/schema";
import {auth} from "@/auth";
export default function AddPostPage() {
    const addPost = async (formData: FormData) => {
        "use server";
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const author = (await auth())?.user?.id;
        if (!title || !content || !author) return;
        await db.insert(postsTable).values({ title:title.trim(), content, authorId:author });
    }
  return (
    <div className="flex  items-center justify-center">
      <form action={addPost}>
        <div className="formItems flex flex-col gap-8 justify-center ">
                    <input className="border-2 border-white p-2 "type="text" name="title" placeholder="Title" required />
        <textarea name="content" className="w-full border-2 border-white p-2" placeholder="Content" required></textarea>
        <button type="submit" className="bg-sky-300 p-2 text-black">Add Post</button>
        </div>

      </form>

      </div>
  );
}   