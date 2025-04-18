import { waitFor } from "@testing-library/react";
import { fetchWithCacheAndValidation } from "@/lib";
import slugify from "@/lib/slugify";
import { getNews, getNewsBySlug } from "@/actions/news.actions";
import appConfig from "@/config/app-config";

jest.mock("@/lib", () => ({
  fetchWithCacheAndValidation: jest.fn(),
}));

jest.mock("@/lib/slugify", () => jest.fn());

const mockedFetch = fetchWithCacheAndValidation as jest.MockedFunction<
  typeof fetchWithCacheAndValidation
>;
const mockedSlugify = slugify as jest.Mock;

const baseURL = appConfig.mmaNewsApiHost;

describe("News API Actions", () => {
  const mockNews = [
    {
      title: "News 1",
      content: [{ type: "paragraph", data: { text: "Content 1" } }],
    },
    {
      title: "News 2",
      content: [{ type: "paragraph", data: { text: "Content 2" } }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetch.mockResolvedValueOnce({ articles: mockNews });
  });

  describe("getNews", () => {
    test("fetches news from the API successfully", async () => {
      const result = await getNews();

      expect(mockedFetch).toHaveBeenCalledWith(
        baseURL,
        "",
        expect.any(Object),
        "Invalid news data received from API",
        { cache: "force-cache" }
      );

      expect(result).toEqual(mockNews);
    });
  });

  describe("getNewsBySlug", () => {
    beforeEach(() => {
      mockedSlugify.mockImplementation((title: string) =>
        title.toLowerCase().replace(/\s+/g, "-")
      );
    });

    test("returns a single article when the slug matches", async () => {
      const expectedSlug = "news-1";
      const result = await getNewsBySlug(expectedSlug);

      await waitFor(() => expect(mockedFetch).toHaveBeenCalled());
      expect(result).toEqual(mockNews[0]);
    });

    test("returns null when no article matches the slug", async () => {
      const nonExistentSlug = "non-existent-slug";
      const result = await getNewsBySlug(nonExistentSlug);

      await waitFor(() => expect(mockedFetch).toHaveBeenCalled());
      expect(result).toBeNull();
    });
  });
});
