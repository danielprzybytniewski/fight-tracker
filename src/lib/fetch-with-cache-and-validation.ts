import { z } from "zod";

type CacheOptions = {
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function fetchWithCacheAndValidation<T>(
  baseUrl: string,
  endpoint: string,
  schema: z.ZodSchema<T>,
  errorMessage: string = "Invalid data received from API",
  cacheOptions: CacheOptions = { next: { revalidate: 3600 } },
): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...cacheOptions,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  const json = await response.json();
  const validation = schema.safeParse(json);

  if (!validation.success) {
    console.error("Validation errors:", validation.error.errors);
    throw new Error(errorMessage);
  }

  return validation.data;
}
