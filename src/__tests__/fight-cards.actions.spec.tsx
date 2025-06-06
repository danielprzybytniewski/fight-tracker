import { z } from "zod";
import { mockFightCards } from "@/__mocks__/mock-data";
import { fetchFightsCards } from "@/actions/fight-cards.actions";
import appConfig from "@/config/app-config";
import {
  type FightCardsResponse,
  FightCardsResponseSchema,
} from "@/types/fight-cards-schema.types";

const mockApiUrl = appConfig.fightCardsApiHost;

describe("fetchFightCards", () => {
  const mockFetch = (options: {
    ok: boolean;
    json: () => Promise<FightCardsResponse>;
  }) => {
    global.fetch = jest.fn().mockResolvedValue(options);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns valid fight cards data when the API response is correct", async () => {
    const mockApiResponse = { data: mockFightCards };

    mockFetch({
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

  test("throws an error if the network response is not ok", async () => {
    mockFetch({ ok: false, json: jest.fn() });

    await expect(fetchFightsCards()).rejects.toThrow(
      "Network response was not ok",
    );
    expect(fetch).toHaveBeenCalledWith(mockApiUrl);
  });

  test("throws an error if the response data is invalid", async () => {
    const invalidData = { invalidKey: "invalidValue" };

    mockFetch({
      ok: true,
      json: jest.fn().mockResolvedValue(invalidData),
    });

    jest.spyOn(FightCardsResponseSchema, "safeParse").mockReturnValue({
      success: false,
      error: { errors: [{ message: "Invalid data format" }] },
    } as z.SafeParseError<FightCardsResponse>);

    console.error = jest.fn();

    await expect(fetchFightsCards()).rejects.toThrow(
      "Invalid data format received from API",
    );
    expect(console.error).toHaveBeenCalledWith("Validation errors:", [
      { message: "Invalid data format" },
    ]);
    expect(fetch).toHaveBeenCalledWith(mockApiUrl);
  });
});
