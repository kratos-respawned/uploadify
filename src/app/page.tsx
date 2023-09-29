import { db } from "@/db";
import { env } from "@/env.mjs";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  console.log(session);
  return (
    <main>
    </main>
  );
}
