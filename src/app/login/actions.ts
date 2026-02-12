"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/src/index";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function loginAction(
  prevState: { error: string },
  formData: FormData
) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Email and password are required." };

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!user.length) return { error: "No user found with this email." };

  const ok = await bcrypt.compare(password, user[0].password);
  if (!ok) return { error: "Incorrect password." };

  await signIn("credentials", { email, password, redirect: false });

  redirect("/");
}
