import {env} from "@/env.mjs"
import {drizzle} from "drizzle-orm/neon-http"
import {neon,neonConfig} from "@neondatabase/serverless"
neonConfig.fetchConnectionCache = true

const sql=neon(env.DATABASE_URL);
export const db= drizzle(sql)