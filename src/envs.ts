import { z } from "zod";

const EnvsSchema = z.object({
  JWT_SECRET: z.string().default("something secure"),
  MDB_URI: z.string().default("mongodb://127.0.0.1:27017"),
  SERVER_PORT: z.coerce.number().default(8080),
});

export const envs = EnvsSchema.parse(process.env);
