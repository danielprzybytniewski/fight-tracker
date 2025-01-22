import {
  getAllFighters,
  getDivisionWithImages,
  getFighterDetails,
  getRankingsWithImages,
} from "@/actions/rankings-actions";
import { fetchFromApiWithCachingAndValidation } from "@/lib/fetch-from-api-with-caching-and-validation";
import {
  mockAthleteCard,
  mockDivision,
  mockRankings,
} from "@/__mocks__/mock-data";

jest.mock("@/lib/fetch-from-api-with-caching-and-validation");

const mockFetch = fetchFromApiWithCachingAndValidation as jest.MockedFunction<
  typeof fetchFromApiWithCachingAndValidation
>;

const mockApiUrl = "https://example.com/api/ufc-rankings";

describe("UFC Rankings API Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL = mockApiUrl;
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL;
  });

  test("fetches fighter details successfully", async () => {
    mockFetch.mockResolvedValueOnce(mockAthleteCard);

    const result = await getFighterDetails("Jonh");

    expect(mockFetch).toHaveBeenCalledWith(
      mockApiUrl,
      "/fighter/Jonh",
      expect.any(Object),
      "Invalid fighter data received from API"
    );
    expect(result).toEqual(mockAthleteCard);
  });

  test("fetches all fighters successfully", async () => {
    const mockFighters = {
      "Jonh Doe": mockAthleteCard,
    };

    mockFetch.mockResolvedValueOnce(mockFighters);

    const result = await getAllFighters();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      mockApiUrl,
      "/fighters",
      expect.any(Object),
      "Invalid fighters data received from API"
    );
    expect(result).toEqual(mockFighters);
  });

  test("fetches rankings and combines them with fighter images", async () => {
    mockFetch.mockResolvedValueOnce(mockRankings);
    mockFetch.mockResolvedValueOnce({ "Jonh Doe": mockAthleteCard });

    const result = await getRankingsWithImages();

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      mockApiUrl,
      "/rankings",
      expect.any(Object),
      "Invalid rankings data received from API"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      mockApiUrl,
      "/fighters",
      expect.any(Object),
      "Invalid fighters data received from API"
    );
    expect(result[0].champion).toEqual({
      ...mockAthleteCard,
      championName: "John Doe",
    });
  });

  test("fetches division details and combines them with fighter images", async () => {
    mockFetch.mockResolvedValueOnce(mockDivision);
    mockFetch.mockResolvedValueOnce({
      "John Doe": mockAthleteCard,
      "1": { ...mockAthleteCard, id: "1", name: "Fighter One" },
    });

    const result = await getDivisionWithImages("lightweight");

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      mockApiUrl,
      "/division/lightweight",
      expect.any(Object),
      "Invalid division data received from API"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      mockApiUrl,
      "/fighters",
      expect.any(Object),
      "Invalid fighters data received from API"
    );
    expect(result.champion).toEqual({
      ...mockDivision.champion,
      ...mockAthleteCard,
    });
    expect(result.fighters[0]).toEqual({
      ...mockAthleteCard,
      id: "1",
      name: "Fighter One",
    });
  });

  test("throws API error", async () => {
    const error = new Error("API Error");
    mockFetch.mockRejectedValueOnce(error);

    await expect(getFighterDetails("Jon Jones")).rejects.toThrow("API Error");
  });

  test("throws an error if API URL is not defined", async () => {
    jest.resetModules();
    delete process.env.NEXT_PUBLIC_UFC_RANKINGS_API_HOST_URL;

    await expect(async () => {
      await import("@/actions/rankings-actions");
    }).rejects.toThrow("API URL is not defined in environment variables");
  });
});
