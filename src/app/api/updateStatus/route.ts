import { db } from "@/db";
import { files, keys, users } from "@/db/schema";
import { env } from "@/env.mjs";
import { fileSchema, requestSchema } from "@/lib/zodSchema";
import { DrizzleError, and, eq, sql } from "drizzle-orm";
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
    const { fileSize, fileName, fileUrl, userID, currentStorage } =
      fileSchema.parse(req);
    const update = await db
      .update(users)
      .set({
        storage_usage: currentStorage + fileSize,
      })
      .where(eq(users.id, userID))
      .execute();
    const updateFileTable = await db.insert(files).values({
      fileName: fileName,
      fileSize: fileSize,
      fileUrl: fileUrl,
      userId: userID,
    });
    return NextResponse.json(
      {
        remainingStorage: env.MAX_LIMIT - (currentStorage + fileSize),
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
