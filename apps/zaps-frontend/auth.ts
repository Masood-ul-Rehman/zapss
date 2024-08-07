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
import { comparePasswords } from "./lib/utils";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
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
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log(credentials);
        let user = null;
        user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });
        if (!user) {
          return null;
        }
        const pwHash = comparePasswords(
          credentials.password as string,
          user.password as string
        );
        if (!pwHash) {
          return null;
        }
        return user;
      },
    }),
  ],
});
