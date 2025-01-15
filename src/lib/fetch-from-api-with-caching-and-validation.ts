import { z } from "zod";

export async function fetchFromApiWithCachingAndValidation<T>(
  baseUrl: string,
  endpoint: string,
  schema: z.ZodSchema<T>,
  errorMessage: string = "Invalid data received from API"
): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    cache: "force-cache",
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
