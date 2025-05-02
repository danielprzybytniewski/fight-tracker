"use server";

import appConfig from "@/config/app-config";
import { fetchWithCacheAndValidation } from "@/lib";
import type { ApiFight, Fight } from "@/types/fights-history-schema.types";
import {
  ApiFightsHistoryResponseSchema,
  AppFightSchema,
} from "@/types/fights-history-schema.types";

const FIGHTS_HISTORY_BASE_URL = appConfig.ufcLegacyApiHost;

export async function getFightsHistory(fighterName: string): Promise<Fight[]> {
  const endpoint = `/fights?name=${encodeURIComponent(fighterName)}`;

  const response = await fetchWithCacheAndValidation(
    FIGHTS_HISTORY_BASE_URL,
    endpoint,
    ApiFightsHistoryResponseSchema,
    "Invalid fights history data",
  );

  const transformedFights = response.fights.map((fight: ApiFight) =>
    AppFightSchema.parse(fight),
  );

  return transformedFights;
}
