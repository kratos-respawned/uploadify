import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq, or } from "drizzle-orm";
import { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.email) return token;
      const dbUser = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email))
        .execute();
      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser[0].id,
        name: dbUser[0].name || dbUser[0].email?.split("@")[0],
        email: dbUser[0].email,
        picture: dbUser[0].image,
      };
    },
  },
};
