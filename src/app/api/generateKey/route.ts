import { env } from "@/env.mjs";
import { authOptions } from "@/lib/authOptions";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
export const GET = async () => {
  const session= await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/signin");
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
    return NextResponse.json({
      API_KEY,
      API_SECRET,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
