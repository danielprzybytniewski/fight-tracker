import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsList from "@/components/news/news-list";

jest.mock("@/components/news/news-preview-item", () =>
  jest.fn(({ newsItem }) => (
    <div data-testid="news-preview-item">{newsItem.title}</div>
  )),
);

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h1 data-testid="gradient-heading">News</h1>),
);

describe("NewsList", () => {
  const mockNewsItems = Array.from({ length: 18 }, (_, index) => ({
    author: "Author",
    categories: "Combat Sports",
    content: [],
    title: `News Item ${index + 1}`,
  }));

  const renderComponent = (newsItems = mockNewsItems) => {
    render(<NewsList newsItems={newsItems} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders the heading and initial visible news items", () => {
    renderComponent();

    const heading = screen.getByTestId("gradient-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("News");

    const newsItems = screen.getAllByTestId("news-preview-item");
    expect(newsItems).toHaveLength(9);
    expect(newsItems[0]).toHaveTextContent("News Item 1");
    expect(newsItems[8]).toHaveTextContent("News Item 9");
  });

  test('loads more news items when "Load more" button is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    const loadMoreButton = screen.getByLabelText("Load more news");
    await user.click(loadMoreButton);

    await waitFor(() => {
      const newsItems = screen.getAllByTestId("news-preview-item");
      expect(newsItems).toHaveLength(18);
      expect(newsItems[6]).toHaveTextContent("News Item 7");
      expect(newsItems[14]).toHaveTextContent("News Item 15");
      expect(sessionStorage.getItem("visibleCount")).toBe("18");
    });
  });

  test('does not render "Load more" button if all news items are visible', () => {
    renderComponent(mockNewsItems.slice(0, 9));

    const loadMoreButton = screen.queryByLabelText("Load more news");
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
