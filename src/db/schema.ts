import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core"

export const users=pgTable('users',{
    id: serial('id').primaryKey(),
    createdAt:timestamp('created_at').notNull().defaultNow()
})