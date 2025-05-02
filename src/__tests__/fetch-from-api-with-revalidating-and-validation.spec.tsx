import { z } from "zod";
import { fetchWithCacheAndValidation } from "@/lib";

global.fetch = jest.fn();

describe("fetchWithCacheAndValidation", () => {
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

    await fetchWithCacheAndValidation(baseUrl, endpoint, schema);

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
      next: { revalidate: 3600 },
    });
  });

  test("returns validated data when the API response matches the schema", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => validResponse,
    });

    const result = await fetchWithCacheAndValidation(baseUrl, endpoint, schema);

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
      fetchWithCacheAndValidation(
        baseUrl,
        endpoint,
        schema,
        "Custom error message",
      ),
    ).rejects.toThrow("Custom error message");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Validation errors:",
      expect.any(Array),
    );

    consoleSpy.mockRestore();
  });

  test("throws an error when the API request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      fetchWithCacheAndValidation(baseUrl, endpoint, schema),
    ).rejects.toThrow(`Failed to fetch data from ${endpoint}`);
  });
});
