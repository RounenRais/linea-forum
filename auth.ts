import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const { signIn, signOut, handlers, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string };
        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .then(res => res[0]);

        if (!user) {
          throw new Error("No user found with the email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          age: user.age,
        };
      }
    })
  ],
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.age = user.age;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.age = token.age as number;
      }
      return session;
    }
  }
});
