import { render, screen } from "@testing-library/react";
import NewsPage, { metadata } from "@/app/news/page";
import { getNews } from "@/actions/news.actions";
import { mockNewsItem } from "@/__mocks__/mock-data";

jest.mock("@/actions/news.actions", () => ({
  getNews: jest.fn(),
}));

jest.mock("@/components/news/news-list", () =>
  jest.fn(() => <div data-testid="news-list"></div>)
);

describe("NewsPage", () => {
  const renderComponent = async () => {
    render(await NewsPage());
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders 'No news found' when there is no news", async () => {
    (getNews as jest.Mock).mockResolvedValue([]);
    await renderComponent();

    expect(screen.getByText("No news found")).toBeInTheDocument();
    expect(screen.queryByTestId("news-list")).not.toBeInTheDocument();
  });

  test("renders NewsList when getNews returns some news items", async () => {
    (getNews as jest.Mock).mockResolvedValue(mockNewsItem);
    await renderComponent();

    expect(screen.getByTestId("news-list")).toBeInTheDocument();
    expect(screen.queryByText("No news found")).not.toBeInTheDocument();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("News | Fight Tracker");
    expect(metadata.description).toBe("Check out newest MMA news");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("News | Fight Tracker");
      expect(metadata.openGraph.description).toBe("Check out newest MMA news");
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/news"
      );
    }
  });
});
