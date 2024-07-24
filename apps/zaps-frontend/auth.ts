import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(Prisma),
  providers: [
    Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // async authorize(credentials, req) {
      //   const user = await db.user.findFirst({
      //     where: {
      //       email: credentials.email,
      //     },
      //   });

      //   if (!user) {
      //     return null;
      //   }

      //   if (user.password !== credentials.password) {
      //     return null;
      //   }

      //   return user;
      // },
    }),
  ],
});
