"use server";

import appConfig from "@/config/app-config";
import { fetchWithCacheAndValidation } from "@/lib";
import slugify from "@/lib/slugify";
import type { NewsDetailData } from "@/types/news-schema.types";
import { NewsApiResponseSchema } from "@/types/news-schema.types";

const MMA_NEWS_BASE_URL = appConfig.mmaNewsApiHost;

export async function getNews(): Promise<NewsDetailData[]> {
  const data = await fetchWithCacheAndValidation(
    MMA_NEWS_BASE_URL,
    "",
    NewsApiResponseSchema,
    "Invalid news data received from API",
    { cache: "force-cache" },
  );

  return data.articles;
}

export async function getNewsBySlug(
  slug: string,
): Promise<NewsDetailData | null> {
  const allNews = await getNews();

  return allNews.find((item) => slugify(item.title) === slug) || null;
}
