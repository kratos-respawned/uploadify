import {z} from "zod";

export const requestSchema = z.object({
    id: z.string().min(1),
    key: z.string().min(1),
    secret: z.string().min(1),
    fileSize: z.number().min(1),
});
