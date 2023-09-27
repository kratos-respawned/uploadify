import { db } from "@/db";
import { env } from "@/env.mjs";
import {users} from "@/db/schema"
export default async function Home() {
  const res = await db.insert(users).values({
    id:(Math.random()*1000).toFixed(0),
  })

  return (
    <main>
      
    </main>
  );
}
