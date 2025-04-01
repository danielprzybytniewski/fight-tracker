import { z } from "zod";

const ApiFightSchema = z.object({
  _id: z.string(),
  event: z.string(),
  date: z.coerce.date(),
  location: z.string().optional(),
  fighter1ID: z.string(),
  fighter2ID: z.string(),
  fighter1: z.string(),
  fighter2: z.string(),
  win: z.string().optional(),
  lose: z.string().optional(),
  draw1: z.string().optional(),
  draw2: z.string().optional(),
  weight_class: z.string().optional(),
  method: z.string().optional(),
  endWith: z.string().optional(),
  roundd: z.string().optional(),
  time: z.string().optional(),
});

export const AppFightSchema = ApiFightSchema.transform((fight) => ({
  id: fight._id,
  event: fight.event,
  date: fight.date,
  location: fight.location,
  fighter1ID: fight.fighter1ID,
  fighter2ID: fight.fighter2ID,
  fighter1Name: fight.fighter1,
  fighter2Name: fight.fighter2,
  winner: fight.win,
  loser: fight.lose,
  draw: fight.draw1 && fight.draw2 ? true : false,
  weightClass: fight.weight_class,
  method: fight.method,
  endWith: fight.endWith,
  round: fight.roundd,
  time: fight.time,
}));

export const ApiFightsHistoryResponseSchema = z.object({
  success: z.boolean(),
  length: z.number(),
  fights: z.array(ApiFightSchema),
});

export type ApiFight = z.infer<typeof ApiFightSchema>;
export type Fight = z.infer<typeof AppFightSchema>;
export type FightResult = "win" | "loss" | "draw";

export type TransformedFightDetails = {
  opponentName: string;
  result: FightResult;
  methodDisplay: string;
  roundDisplay: string;
  timeDisplay: string;
  locationDisplay: string;
  weightClassDisplay: string;
  endWithDisplay?: string;
};
