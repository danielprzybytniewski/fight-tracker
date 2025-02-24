import { z } from "zod";

export const FighterSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  imgUrl: z.string().url().optional(),
  wins: z.coerce.number().optional(),
  losses: z.coerce.number().optional(),
  draws: z.coerce.number().optional(),
  category: z.string(),
  nickname: z.string().optional(),
  status: z.string().optional(),
  placeOfBirth: z.string().optional(),
  trainsAt: z.string().optional(),
  fightingStyle: z.string().optional(),
  age: z.string().optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  octagonDebut: z.string().optional(),
  reach: z.coerce.number().optional(),
  legReach: z.coerce.number().optional(),
});

const ChampionSchema = z.object({
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

export const NOT_AVAILABLE = "N/A";
