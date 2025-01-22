import { fetchFromApiWithCachingAndValidation } from "@/lib/fetch-from-api-with-caching-and-validation";
import { z } from "zod";

global.fetch = jest.fn();

describe("fetchFromApiWithCachingAndValidation", () => {
  const baseUrl = "https://api.example.com";
  const endpoint = "/data";
  const schema = z.object({
    id: z.string(),
    name: z.string(),
  });

  const validResponse = { id: "1", name: "Test Item" };
  const invalidResponse = { id: 1, name: 123 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches data from the API with the correct URL and caching enabled", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => validResponse,
    });

    await fetchFromApiWithCachingAndValidation(baseUrl, endpoint, schema);

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
      cache: "force-cache",
    });
  });

  test("returns validated data when the API response matches the schema", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => validResponse,
    });

    const result = await fetchFromApiWithCachingAndValidation(
      baseUrl,
      endpoint,
      schema
    );

    expect(result).toEqual(validResponse);
  });

  test("throws an error when the API response does not match the schema", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    });

    await expect(
      fetchFromApiWithCachingAndValidation(
        baseUrl,
        endpoint,
        schema,
        "Custom error message"
      )
    ).rejects.toThrow("Custom error message");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Validation errors:",
      expect.any(Array)
    );

    consoleSpy.mockRestore();
  });

  test("throws an error when the API request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      fetchFromApiWithCachingAndValidation(baseUrl, endpoint, schema)
    ).rejects.toThrow(`Failed to fetch data from ${endpoint}`);
  });
});
