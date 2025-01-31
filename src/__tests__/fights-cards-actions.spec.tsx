import appConfig from "@/config/app-config";
import { mockFightsCards } from "@/__mocks__/mock-data";
import { fetchFightsCards } from "@/actions/fights-cards-actions";
import {
  FightCardsResponse,
  FightCardsResponseSchema,
} from "@/types/fight-cards-schema.types";
import { z } from "zod";

const mockApiUrl = appConfig.NEXT_PUBLIC_MMA_FIGHT_CARDS_API_HOST_URL;

describe("fetchFightsCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("throws an error if the network response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(),
    });

    await expect(fetchFightsCards()).rejects.toThrow(
      "Network response was not ok"
    );
    expect(fetch).toHaveBeenCalledWith(mockApiUrl);
  });

  test("throws an error if the response data is invalid", async () => {
    const invalidData = { invalidKey: "invalidValue" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(invalidData),
    });

    jest.spyOn(FightCardsResponseSchema, "safeParse").mockReturnValue({
      success: false,
      error: { errors: [{ message: "Invalid data format" }] },
    } as z.SafeParseError<FightCardsResponse>);

    console.error = jest.fn();

    await expect(fetchFightsCards()).rejects.toThrow(
      "Invalid data format received from API"
    );
    expect(console.error).toHaveBeenCalledWith("Validation errors:", [
      { message: "Invalid data format" },
    ]);
    expect(fetch).toHaveBeenCalledWith(mockApiUrl);
  });

  test("returns valid fight cards data when the API response is correct", async () => {
    const mockApiResponse = { data: mockFightsCards };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    jest.spyOn(FightCardsResponseSchema, "safeParse").mockReturnValue({
      success: true,
      data: mockApiResponse,
    } as z.SafeParseSuccess<FightCardsResponse>);

    const result = await fetchFightsCards();
    expect(result).toEqual(mockApiResponse);
    expect(fetch).toHaveBeenCalledWith(mockApiUrl);
  });
});
