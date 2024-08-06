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
import { comparePasswords, saltAndHashPassword } from "./lib/utils";
let data = db as any;
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(data, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  } as any),
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

      authorize(credentials) {
        let user = null;
        user = data.users.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const pwHash = comparePasswords(
          credentials.password as string,
          user.password
        );
        if (!pwHash) {
          return null;
        }
        return user;
      },
    }),
  ],
});
