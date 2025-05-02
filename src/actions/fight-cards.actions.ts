"use server";

import appConfig from "@/config/app-config";
import type { FightCardsResponse } from "@/types/fight-cards-schema.types";
import { FightCardsResponseSchema } from "@/types/fight-cards-schema.types";

const FIGHT_CARDS_BASE_URL = appConfig.fightCardsApiHost;

export async function fetchFightsCards(): Promise<FightCardsResponse> {
  const response = await fetch(FIGHT_CARDS_BASE_URL);

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
