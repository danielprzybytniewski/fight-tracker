import { z } from "zod";

const FightCardsFighterSchema = z.object({
  name: z.string(),
  record: z.string(),
  country: z.string().url(),
  picture: z.union([z.string().url(), z.string()]),
});

const FightCardsFightSchema = z.object({
  main: z.boolean(),
  weight: z.coerce.number().transform((pounds) => pounds * 0.453592 || 0),
  fighterA: FightCardsFighterSchema,
  fighterB: FightCardsFighterSchema,
});

const FightCardsEventSchema = z.object({
  title: z.string(),
  fights: z.array(FightCardsFightSchema),
});

export const FightCardsResponseSchema = z.object({
  data: z.array(FightCardsEventSchema),
});

export type FightCardsFighter = z.infer<typeof FightCardsFighterSchema>;
export type FightCardsEvent = z.infer<typeof FightCardsEventSchema>;
export type FightCardsResponse = z.infer<typeof FightCardsResponseSchema>;
