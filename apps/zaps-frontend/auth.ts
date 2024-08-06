import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../../packages/db/index";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "../../packages/db/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(
    db as any,
    {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    } as any
  ),
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
