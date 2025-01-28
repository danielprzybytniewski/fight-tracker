"use server";
import appConfig from "@/config/app-config";
import { fetchFromApiWithCachingAndValidation } from "@/lib/fetch-from-api-with-caching-and-validation";
import {
  Fighter,
  FighterSchema,
  RankingsResponseSchema,
  FightersResponseSchema,
  FightersResponse,
  DivisionSchema,
  DivisionWithChampion,
  DivisionWithChampionAndFighters,
} from "@/types/rankings-schema.types";

const UFC_RANKINGS_BASE_URL = appConfig.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL;

export async function getFighterDetails(fighterId: string): Promise<Fighter> {
  return fetchFromApiWithCachingAndValidation(
    UFC_RANKINGS_BASE_URL,
    `/fighter/${fighterId}`,
    FighterSchema,
    "Invalid fighter data received from API"
  );
}

export async function getAllFighters(): Promise<FightersResponse> {
  return fetchFromApiWithCachingAndValidation(
    UFC_RANKINGS_BASE_URL,
    "/fighters",
    FightersResponseSchema,
    "Invalid fighters data received from API"
  );
}

export async function getRankingsWithImages(): Promise<
  Array<DivisionWithChampion>
> {
  const [rankings, allFighters] = await Promise.all([
    fetchFromApiWithCachingAndValidation(
      UFC_RANKINGS_BASE_URL,
      "/rankings",
      RankingsResponseSchema,
      "Invalid rankings data received from API"
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
  divisionId: string
): Promise<DivisionWithChampionAndFighters> {
  const [division, allFighters] = await Promise.all([
    fetchFromApiWithCachingAndValidation(
      UFC_RANKINGS_BASE_URL,
      `/division/${divisionId}`,
      DivisionSchema,
      "Invalid division data received from API"
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
