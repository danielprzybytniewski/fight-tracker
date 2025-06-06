import { mockApiFight } from "@/__mocks__/mock-data";
import { getFightsHistory } from "@/actions/fights-history.actions";
import appConfig from "@/config/app-config";
import { fetchWithCacheAndValidation } from "@/lib";
import {
  ApiFightsHistoryResponseSchema,
  AppFightSchema,
} from "@/types/fights-history-schema.types";

jest.mock("@/lib/fetch-with-cache-and-validation");

const mockFetch = fetchWithCacheAndValidation as jest.MockedFunction<
  typeof fetchWithCacheAndValidation
>;

const FIGHTS_HISTORY_BASE_URL = appConfig.ufcLegacyApiHost;

describe("getFightsHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches fights history successfully", async () => {
    const mockApiResponse = {
      fights: [mockApiFight],
    };

    mockFetch.mockResolvedValueOnce(mockApiResponse);

    const result = await getFightsHistory("Glover Teixeira");

    expect(mockFetch).toHaveBeenCalledWith(
      FIGHTS_HISTORY_BASE_URL,
      `/fights?name=Glover%20Teixeira`,
      ApiFightsHistoryResponseSchema,
      "Invalid fights history data",
    );
    expect(result).toEqual(
      mockApiResponse.fights.map((fight) => AppFightSchema.parse(fight)),
    );
  });

  test("handles empty fights array", async () => {
    const mockApiResponse = {
      fights: [],
    };

    mockFetch.mockResolvedValueOnce(mockApiResponse);

    const result = await getFightsHistory("Jan Kowalski");

    expect(result).toEqual([]);
  });

  test("throws API error", async () => {
    const error = new Error("API Error");
    mockFetch.mockRejectedValueOnce(error);

    await expect(getFightsHistory("Glover Teixeira")).rejects.toThrow(
      "API Error",
    );
  });
});
