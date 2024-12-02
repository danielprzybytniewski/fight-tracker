import { z } from "zod";

export const FighterSchema = z.object({
  name: z.string(),
  record: z.string(),
  country: z.string().url(),
  picture: z.string().url(),
  link: z.string().url(),
});

export const FightSchema = z.object({
  fighterA: FighterSchema,
  fighterB: FighterSchema,
});

export const EventSchema = z.object({
  title: z.string(),
  date: z.string(),
  fights: z.array(FightSchema),
});

export const FightCardsResponseSchema = z.object({
  data: z.array(EventSchema),
});

export type FightCardsResponseType = z.infer<typeof FightCardsResponseSchema>;
export type FighterType = z.infer<typeof FighterSchema>;
