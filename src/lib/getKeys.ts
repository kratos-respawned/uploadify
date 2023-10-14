import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
export const getKeys = async (): Promise<
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
    const Users = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .execute();
    if (!Users || !Users[0]) {
      return {
        API_KEY: null,
        API_SECRET: null,
        error: "Something went wrong",
      };
    }
    if (!Users[0].api_key || !Users[0].api_secret) {
      return {
        API_KEY: "-1",
        API_SECRET: "-1",
        error: null,
      };
    }
    return {
      API_KEY: Users[0].api_key,
      API_SECRET: Users[0].api_secret,
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
