"use server";
import appConfig from "@/config/app-config";
import {
  FightCardsResponse,
  FightCardsResponseSchema,
} from "@/types/fight-cards-schema.types";

export async function fetchFightsCards(): Promise<FightCardsResponse> {
  const fightCardsApiUrl = appConfig.fightCardsApiHost;

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
