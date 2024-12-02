"use server";

import {
  FightCardsResponseType,
  FightCardsResponseSchema,
} from "@/types/fight-cards-schema.types";

export async function fetchFightCards(): Promise<FightCardsResponseType> {
  const response = await fetch("https://mmafightcardsapi.adaptable.app/");

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
