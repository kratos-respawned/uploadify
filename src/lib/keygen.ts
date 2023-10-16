import { db } from "@/db";
import { keys } from "@/db/schema";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { createHmac } from "crypto";
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
    const keySalt = createHmac("sha512", env.SERVER_SECRET)
      .update(Date.now().toString() + session.user.email)
      .digest("hex")
      .slice(-5);
    const secretSalt = createHmac("sha512", env.KEY_SECRET)
      .update(Date.now().toString() + session.user.id)
      .digest("hex")
      .slice(-5);
    const API_KEY =
      createHmac("sha512", env.KEY_SECRET)
        .update(session.user.id)
        .digest("hex")
        .slice(0, 20) + keySalt;
    const API_SECRET =
      createHmac("sha512", env.SERVER_SECRET)
        .update(session.user.id + session.user.email)
        .digest("hex")
        .slice(0, 25) + secretSalt;
    await db
      .update(keys)
      .set({
        api_key: API_KEY,
        api_secret: API_SECRET,
        userId: session.user.id,
      })
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
