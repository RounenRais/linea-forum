import { db } from "@/src/index";
import { postsTable, usersTable } from "@/src/db/schema";
import { auth } from "@/auth";
import Link from "next/link";
export default async function Posts() {
  const posts = await db.select().from(postsTable);
  const users = await db.select().from(usersTable);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-3xl p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-2 border-gray-300 rounded p-4 mb-4 text-white"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              Author:{" "}
              {users.find((user) => user.id === parseInt(post.authorId))
                ?.email || "Unknown"}
            </p>
          </div>

        ))}
      </div>

    </div>
  );
}
