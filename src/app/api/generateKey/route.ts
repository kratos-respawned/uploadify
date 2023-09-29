import { env } from "@/env.mjs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/signin");
  }
  try {
    const API_KEY = crypto
      .pbkdf2Sync(session.user.id, env.KEY_SECRET, 10, 32, `sha512`)
      .toString(`hex`);
    const API_SECRET = crypto
      .pbkdf2Sync(
        JSON.stringify(session.user),
        env.SERVER_SECRET,
        10,
        32,
        `sha512`
      )
      .toString(`hex`);
    await db
      .update(users)
      .set({
        api_key: API_KEY,
        api_secret: API_SECRET,
      })
      .where(eq(users.id, session.user.id))
      .execute();
    return NextResponse.json({
      API_KEY,
      API_SECRET,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
