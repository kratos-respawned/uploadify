import { db } from "@/db";
import { keys } from "@/db/schema";
import { DrizzleError, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { keygen } from "./keygen";
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
    const dbKeys = await db
      .select()
      .from(keys)
      .where(eq(keys.userId, session.user.id))
      .execute();

    if (dbKeys.length === 0 || !dbKeys[0].api_key || !dbKeys[0].api_secret) {
      const { API_KEY, API_SECRET, error } = await keygen();
      if (error != null)
        return {
          API_KEY: null,
          API_SECRET: null,
          error: error,
        };
      else
        return {
          API_KEY,
          API_SECRET,
          error: null,
        };
    }

    return {
      API_KEY: dbKeys[0].api_key,
      API_SECRET: dbKeys[0].api_secret,
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
