import { z } from 'zod';

const envSchema = z.object({
  ONE_DAY_ONE_STORY_NEXTAPP: z.string().url(),
  CRON_SECRET: z.string().min(1),
  PORT: z.string().default("3001").transform(Number)});

// Function to validate and export the env vars
export function validateEnv() {
  return envSchema.parse(process.env);
}

const env = validateEnv();

export const {CRON_SECRET,ONE_DAY_ONE_STORY_NEXTAPP,PORT} = env
