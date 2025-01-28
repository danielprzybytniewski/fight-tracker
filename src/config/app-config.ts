import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_MMA_FIGHT_CARDS_API_HOST_URL: z.string().url(),
  NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL: z.string().url(),
});

const appConfig = envSchema.parse(process.env);

export default appConfig;
