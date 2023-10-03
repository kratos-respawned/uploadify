import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    SERVER_SECRET: z.string().min(1),
    KEY_SECRET: z.string().min(1),
    ADMIN_SECRET: z.string().min(1),
    
  },
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SERVER_SECRET: process.env.SERVER_SECRET,
    KEY_SECRET: process.env.KEY_SECRET,
    ADMIN_SECRET: process.env.ADMIN_SECRET,
  },
});
