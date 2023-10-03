import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { requestSchema } from "@/lib/zodSchema";
import { DrizzleError, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
export const runtime = "edge";
export const POST = async (request: Request) => {
  try {
    const req = await request.json();
    const token = request.headers.get("authorization");
    if (!token || token !== env.ADMIN_SECRET) {
      throw new Error("Unauthorized");
    }
    const { id, key, secret, fileSize } = requestSchema.parse(req);
    const res = await db.select().from(users).where(eq(users.id, id)).execute();
    if (!res || res.length === 0) throw new DrizzleError("Invalid Credentials");
    const user = res[0];
    if (user.api_key !== key || user.api_secret !== secret)
      throw new Error("invalid key or secret");
    if ((user.storage_usage || 0) + fileSize > 524288000)
      throw new Error("Storage limit exceeded");
    return NextResponse.json(
      {
        message: "Valid",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    let message: string = "";
    if (e instanceof z.ZodError) {
      message = "Invalid request body";
    } else if (e instanceof DrizzleError) {
      message = e.message;
    } else if (e instanceof Error) {
      message = e.message;
    }
    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 400,
      }
    );
  }
};
