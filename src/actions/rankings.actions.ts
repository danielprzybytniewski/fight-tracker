"use server";

import appConfig from "@/config/app-config";
import { fetchWithCacheAndValidation } from "@/lib";
import {
  DivisionSchema,
  type DivisionWithChampion,
  type DivisionWithChampionAndFighters,
  type Fighter,
  FighterSchema,
  type FightersResponse,
  FightersResponseSchema,
  RankingsResponseSchema,
} from "@/types/rankings-schema.types";

const UFC_RANKINGS_BASE_URL = appConfig.ufcRankingsApiHost;

export async function getFighterDetails(fighterId: string): Promise<Fighter> {
  return fetchWithCacheAndValidation(
    UFC_RANKINGS_BASE_URL,
    `/fighter/${fighterId}`,
    FighterSchema,
    "Invalid fighter data received from API",
  );
}

export async function getAllFighters(): Promise<FightersResponse> {
  return fetchWithCacheAndValidation(
    UFC_RANKINGS_BASE_URL,
    "/fighters",
    FightersResponseSchema,
    "Invalid fighters data received from API",
  );
}

export async function getRankingsWithImages(): Promise<
  Array<DivisionWithChampion>
> {
  const [rankings, allFighters] = await Promise.all([
    fetchWithCacheAndValidation(
      UFC_RANKINGS_BASE_URL,
      "/rankings",
      RankingsResponseSchema,
      "Invalid rankings data received from API",
    ),
    getAllFighters(),
  ]);

  return rankings.map((division) => ({
    ...division,
    champion: {
      ...division.champion,
      ...allFighters[division.champion.id],
    },
  }));
}

export async function getDivisionWithImages(
  divisionId: string,
): Promise<DivisionWithChampionAndFighters> {
  const [division, allFighters] = await Promise.all([
    fetchWithCacheAndValidation(
      UFC_RANKINGS_BASE_URL,
      `/division/${divisionId}`,
      DivisionSchema,
      "Invalid division data received from API",
    ),
    getAllFighters(),
  ]);

  return {
    ...division,
    champion: {
      ...division.champion,
      ...allFighters[division.champion.id],
    },
    fighters: division.fighters.map((fighter) => ({
      ...fighter,
      ...allFighters[fighter.id],
    })),
  };
}
