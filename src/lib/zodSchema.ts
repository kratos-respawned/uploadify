import { env } from "@/env.mjs";
import { z } from "zod";

export const requestSchema = z.object({
  key: z.string().min(1),
  secret: z.string().min(1),
  fileSize: z.number().min(1).max(env.MAX_FILE_SIZE),
});
export const fileSchema = z.object({
  userID: z.string().min(1),
  currentStorage: z.number().min(1).max(env.MAX_LIMIT),
  fileName: z.string().min(1),
  fileSize: z.number().min(1).max(env.MAX_FILE_SIZE),
  fileUrl: z.string().min(1),
});
