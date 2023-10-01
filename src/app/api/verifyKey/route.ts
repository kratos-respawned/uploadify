import { env } from "@/env.mjs";
import { generateEncryptionKey } from "@/lib/generateEncryptionKey";
import { decryptKeys } from "@/lib/hashKeys";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const runtime="edge"
export const GET = async (request: Request) => {
    const KEYS={
        API_KEY: "bSgHeN4Kxfm47CkV5zrLPujrmUPfv3cmS1Wds3xqBK+dnRqQ5TDSoMzVUfz1eWp6vTRwW0jHOwmh04XXa+SKCg==",
        API_SECRET: "8mLdgs3hhyTNx909uJP+YDWYd2Ki06aVzev50kRrYdT5J0BZm8IH9FC9CI7YFuADBVh++WALtUiZ20uIzRfQFJ3M6zFkIYbvB4OuvrhAkIlhRrs9/SIKeMwOeQ0Rx2kBm+breMznjW8cgonOkFmkK4aPoJ3K+2cbpO3a4Hm0IP507whcWtoF6CdPtUX8ENBvNIG6ZJUY9bXIe6EVx5M5l8bQbEDJgKbucr4Ut00GbuFvS2culDI5mcfYrIqBqqf6fpHn75y5oPA="
    }
    const { keyEncyptor,secretKeyEncryptor } = await generateEncryptionKey();
    if (!keyEncyptor || !secretKeyEncryptor) return NextResponse.error();
    const firstValue= await decryptKeys(keyEncyptor,KEYS.API_KEY)
    const secondValue= await decryptKeys(secretKeyEncryptor,KEYS.API_SECRET)
    console.log(firstValue,secondValue)
    // const token = req.cookies.get(USER_TOKEN)?.value

    // if (!token) throw new AuthError('Missing user token')
  
    // try {
    //   const verified = await jwtVerify(
    //     token,
    //     new TextEncoder().encode(getJwtSecretKey())
    //   )
    //   return verified.payload as UserJwtPayload
    // } catch (err) {
    //   throw new AuthError('Your token has expired.')
    // }
return NextResponse.json({
    msg:"hello from edge"
    // API_KEY,
    // API_SECRET,
  });

};
