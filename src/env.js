import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  ONE_DAY_ONE_STORY_NEXTAPP: z.string().url(),
  CRON_SECRET: z.string().min(1),
  PORT: z.string().default("3001").transform(Number),
});

// Function to validate and export the env vars
function validateEnv() {
  return envSchema.parse(process.env);
}

export const env = validateEnv();
