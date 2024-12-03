"use server";

import {
  FightCardsResponse,
  FightCardsResponseSchema,
} from "@/types/fight-cards-schema.types";

export async function fetchFightCards(): Promise<FightCardsResponse> {
  const fightCardsApiUrl = process.env.NEXT_PUBLIC_MMA_FIGHT_CARDS_API_HOST_URL;

  if (!fightCardsApiUrl) {
    throw new Error("API URL is not defined in environment variables");
  }

  const response = await fetch(fightCardsApiUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  const validation = FightCardsResponseSchema.safeParse(json);

  if (!validation.success) {
    console.error("Validation errors:", validation.error.errors);
    throw new Error("Invalid data format received from API");
  }

  return validation.data;
}
