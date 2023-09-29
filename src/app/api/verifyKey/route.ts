import { env } from "@/env.mjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const runtime="edge"
export const GET = async (request: Request) => {
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
