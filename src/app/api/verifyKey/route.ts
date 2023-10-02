import { env } from "@/env.mjs";
import { generateEncryptionKey } from "@/lib/generateEncryptionKey";
import { decryptKeys } from "@/lib/hashKeys";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
// export const runtime="edge"
export const POST = async (request: Request) => {
    try{
    //  todo: get the id and admin key from cloud function and check if id exists in db and if admin key is correct
    // if yes then return true else false
    
    // cloud function will first verify the api_key and secret_key and then send the id and admin key
        // const data= await request.json();
        // const res= jwt.verify(keys.API_SECRET,env.SERVER_SECRET);
        // const res1= jwt.verify(keys.API_KEY,env.KEY_SECRET);
        // console.log(res);
        // console.log(res1);

        // console.log(data);

    }catch(e){
        if(e instanceof jwt.JsonWebTokenError){
            console.log("invalid token")
        }else
        console.log(e);
    }
return NextResponse.json({
    msg:"hello from edge"
    // API_KEY,
    // API_SECRET,
  });

};
