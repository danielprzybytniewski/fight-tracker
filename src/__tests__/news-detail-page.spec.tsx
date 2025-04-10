import { render, screen } from "@testing-library/react";
import NewsDetailPage, { generateMetadata } from "@/app/news/[slug]/page";
import { getNewsBySlug } from "@/actions/news.actions";
import { mockNewsItem } from "@/__mocks__/mock-data";

jest.mock("@/actions/news.actions", () => ({
  getNewsBySlug: jest.fn(),
}));

jest.mock("@/components/news/news-detail", () =>
  jest.fn(({ newsItem }) => (
    <div data-testid="news-detail">{newsItem.title}</div>
  ))
);

describe("NewsDetailPage", () => {
  const mockParams = { slug: "exciting-mma-news" };

  const renderComponent = async () => {
    render(await NewsDetailPage({ params: Promise.resolve(mockParams) }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders NewsDetail when getNewsBySlug returns a news item", async () => {
    (getNewsBySlug as jest.Mock).mockResolvedValue(mockNewsItem);
    await renderComponent();

    expect(screen.getByTestId("news-detail")).toBeInTheDocument();
    expect(screen.getByTestId("news-detail")).toHaveTextContent(
      "Exciting MMA News"
    );
    expect(screen.queryByText("News not found")).not.toBeInTheDocument();
  });

  test("renders 'News not found' when getNewsBySlug returns null", async () => {
    (getNewsBySlug as jest.Mock).mockResolvedValue(null);
    await renderComponent();

    expect(screen.getByText("News not found")).toBeInTheDocument();
    expect(screen.queryByTestId("news-detail")).not.toBeInTheDocument();
  });

  test("generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve(mockParams),
    });

    expect(metadata.title).toBe("Exciting Mma News | Fight Tracker");
    expect(metadata.description).toBe(
      "Checkout more info about Exciting Mma News"
    );
    expect(metadata.keywords).toContain(
      "Exciting Mma News info, Exciting Mma News content"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe(
        "Exciting Mma News | Fight Tracker"
      );
      expect(metadata.openGraph.description).toBe(
        "Checkout more info about Exciting Mma News"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/news/exciting-mma-news"
      );
    }
  });
});
