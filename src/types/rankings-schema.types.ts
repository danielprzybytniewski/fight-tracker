import { z } from "zod";

export const FighterSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  wins: z.coerce.number().optional(),
  losses: z.coerce.number().optional(),
  draws: z.coerce.number().optional(),
  category: z.string().optional(),
  nickname: z.string().optional(),
  status: z.string().optional(),
  placeOfBirth: z.string().optional(),
  trainsAt: z.string().optional(),
  fightingStyle: z.string().optional(),
  age: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  octagonDebut: z.string().optional(),
  reach: z.string().optional(),
  legReach: z.string().optional(),
});

export const ChampionSchema = z.object({
  id: z.string(),
  championName: z.string(),
  imgUrl: z.string().optional(),
});

export const DivisionSchema = z.object({
  id: z.string(),
  categoryName: z.string(),
  champion: ChampionSchema,
  fighters: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      imgUrl: z.string().optional(),
    })
  ),
});

export const RankingsResponseSchema = z.array(DivisionSchema);
export const FightersResponseSchema = z.record(FighterSchema);

export type Fighter = z.infer<typeof FighterSchema>;
export type Division = z.infer<typeof DivisionSchema>;
export type RankingsResponse = z.infer<typeof RankingsResponseSchema>;
export type FightersResponse = z.infer<typeof FightersResponseSchema>;
export type DivisionWithChampion = Division & { champion: Fighter };
export type DivisionWithChampionAndFighters = Division & {
  champion: Fighter;
  fighters: Fighter[];
};

export type DetailItem = {
  label: string;
  value: string | undefined;
};
