import { z } from "zod";

const FighterSchema = z.object({
  name: z.string(),
  record: z.string(),
  country: z.string().url(),
  picture: z.union([z.string().url(), z.string()]),
});

const FightSchema = z.object({
  main: z.boolean(),
  weight: z.coerce.number().transform((pounds) => pounds * 0.453592 || 0),
  fighterA: FighterSchema,
  fighterB: FighterSchema,
});

const EventSchema = z.object({
  title: z.string(),
  date: z.string(),
  fights: z.array(FightSchema),
});

export const FightCardsResponseSchema = z.object({
  data: z.array(EventSchema),
});

export type Fighter = z.infer<typeof FighterSchema>;
export type Event = z.infer<typeof EventSchema>;
export type FightCardsResponse = z.infer<typeof FightCardsResponseSchema>;
