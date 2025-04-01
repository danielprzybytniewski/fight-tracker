"use server";

import appConfig from "@/config/app-config";
import { fetchFromApiWithRevalidatingAndValidation } from "@/lib";
import {
  ApiFightsHistoryResponseSchema,
  AppFightSchema,
  Fight,
  ApiFight,
} from "@/types/fights-history-schema.types";

const FIGHTS_HISTORY_BASE_URL = appConfig.ufcLegacyApiHost;

export async function getFightsHistory(fighterName: string): Promise<Fight[]> {
  const endpoint = `/fights?name=${encodeURIComponent(fighterName)}`;

  const response = await fetchFromApiWithRevalidatingAndValidation(
    FIGHTS_HISTORY_BASE_URL,
    endpoint,
    ApiFightsHistoryResponseSchema,
    "Invalid fights history data"
  );

  const transformedFights = response.fights.map((fight: ApiFight) =>
    AppFightSchema.parse(fight)
  );

  return transformedFights;
}
