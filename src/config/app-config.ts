import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_MMA_FIGHT_CARDS_API_HOST_URL: z.string().url(),
  NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL: z.string().url(),
  NEXT_PUBLIC_UFC_LEGACY_API_HOST_URL: z.string().url(),
  NEXT_PUBLIC_MMA_NEWS_API_HOST_URL: z.string().url(),
});

const parsedEnv = envSchema.parse(process.env);

const fightCardsApiHost = parsedEnv.NEXT_PUBLIC_MMA_FIGHT_CARDS_API_HOST_URL;
const ufcRankingsApiHost = parsedEnv.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL;
const ufcLegacyApiHost = parsedEnv.NEXT_PUBLIC_UFC_LEGACY_API_HOST_URL;
const mmaNewsApiHost = parsedEnv.NEXT_PUBLIC_MMA_NEWS_API_HOST_URL;

const appConfig = {
  fightCardsApiHost,
  ufcRankingsApiHost,
  ufcLegacyApiHost,
  mmaNewsApiHost,
};

export default appConfig;
