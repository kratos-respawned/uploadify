import { env } from "@/env.mjs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { generateEncryptionKey } from "@/lib/generateEncryptionKey";
import { encryptKeys } from "@/lib/hashKeys";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/signin");
  }
  try {
    console.time("generateEncryptionKey");
    const { keyEncyptor, secretKeyEncryptor } = await generateEncryptionKey();
    if (!keyEncyptor || !secretKeyEncryptor) return NextResponse.error();
    const API_KEY = await encryptKeys(
      keyEncyptor,
      session.user.id
    );
    const API_SECRET = await encryptKeys(
      secretKeyEncryptor,
      JSON.stringify(session.user)
    );
    console.timeEnd("generateEncryptionKey");
    
    // await db
    //   .update(users)
    //   .set({
    //     api_key: API_KEY,
    //     api_secret: API_SECRET,
    //   })
    //   .where(eq(users.id, session.user.id))
    //   .execute();
    return NextResponse.json({
        API_KEY,
        API_SECRET,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
