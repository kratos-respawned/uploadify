import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
export const keygen = async (): Promise<
  | {
      API_KEY: string;
      API_SECRET: string;
      error: null;
    }
  | {
      API_KEY: null;
      API_SECRET: null;
      error: string;
    }
> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      API_KEY: null,
      API_SECRET: null,
      error: "No session",
    };
  }
  try {
    const API_KEY = jwt.sign(session.user.id, env.KEY_SECRET);
    const API_SECRET = jwt.sign(session.user, env.SERVER_SECRET);
    await db
      .update(users)
      .set({
        api_key: API_KEY,
        api_secret: API_SECRET,
      })
      .where(eq(users.id, session.user.id))
      .execute();
    return {
      API_KEY,
      API_SECRET,
      error: null,
    };
  } catch (error) {
    return {
      API_KEY: null,
      API_SECRET: null,
      error: "Something went wrong",
    };
  }
};
