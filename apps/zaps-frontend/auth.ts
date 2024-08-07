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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          console.log(credentials);
          let user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email as string),
          });
          if (!user) return null;

          const pwHash = comparePasswords(
            credentials.password as string,
            user.password as string
          );
          console.log(pwHash);
          if (!pwHash) return null;

          return user;
        } catch (error) {
          console.error("Authorization Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return baseUrl;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
