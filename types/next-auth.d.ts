import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    age?: number;
    avatar?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      age?: number;
      avatar?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    age?: number;
    avatar?: string | null;
  }
}