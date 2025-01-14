"use server";
import {
  Fighter,
  FighterSchema,
  RankingsResponseSchema,
  FightersResponseSchema,
  Division,
  FightersResponse,
  DivisionSchema,
} from "@/types/rankings-schema.types";

const UFC_RANKINGS_BASE_URL = process.env.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL;

export async function getFighterDetails(fighterId: string): Promise<Fighter> {
  const response = await fetch(
    `${UFC_RANKINGS_BASE_URL}/fighter/${fighterId}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fighter");
  }

  const json = await response.json();
  const validation = FighterSchema.safeParse(json);

  if (!validation.success) {
    console.error("Validation errors:", validation.error.errors);
    throw new Error("Invalid fighter data received from API");
  }

  return validation.data;
}

export async function getAllFighters(): Promise<FightersResponse> {
  const response = await fetch(`${UFC_RANKINGS_BASE_URL}/fighters`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch fighters");
  }

  const json = await response.json();
  const validation = FightersResponseSchema.safeParse(json);

  if (!validation.success) {
    console.error("Validation errors:", validation.error.errors);
    throw new Error("Invalid fighters data received from API");
  }

  return validation.data;
}

export async function getRankingsWithImages(): Promise<
  Array<Division & { champion: Fighter }>
> {
  const [rankingsResponse, allFighters] = await Promise.all([
    fetch(`${UFC_RANKINGS_BASE_URL}/rankings`, {
      cache: "force-cache",
    }).then((res) => res.json()),
    getAllFighters(),
  ]);

  const rankingsValidation = RankingsResponseSchema.safeParse(rankingsResponse);

  if (!rankingsValidation.success) {
    console.error("Validation errors:", rankingsValidation.error.errors);
    throw new Error("Invalid rankings data received from API");
  }

  return rankingsValidation.data.map((division) => ({
    ...division,
    champion: {
      ...division.champion,
      ...allFighters[division.champion.id],
    },
  }));
}

export async function getDivisionWithImages(
  divisionId: string
): Promise<Division & { champion: Fighter; fighters: Fighter[] }> {
  const [divisionResponse, allFighters] = await Promise.all([
    fetch(`${UFC_RANKINGS_BASE_URL}/division/${divisionId}`, {
      cache: "force-cache",
    }).then((res) => res.json()),
    getAllFighters(),
  ]);

  const divisionValidation = DivisionSchema.safeParse(divisionResponse);

  if (!divisionValidation.success) {
    console.error("Validation errors:", divisionValidation.error.errors);
    throw new Error("Invalid division data received from API");
  }

  const division = divisionValidation.data;

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
