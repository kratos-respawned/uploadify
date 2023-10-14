import { NextResponse } from "next/server";
import { keygen } from "@/lib/keygen";
export const GET = async () => {
  const { error, API_KEY, API_SECRET } = await keygen();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json({
    API_KEY: API_KEY,
    API_SECRET: API_SECRET,
  });
};
