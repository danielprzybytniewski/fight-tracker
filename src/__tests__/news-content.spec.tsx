import { render, screen } from "@testing-library/react";
import NewsContent from "@/components/news/news-content";
import {
  generateMockNewsImages,
  mockNewsParagraphs,
} from "@/__mocks__/mock-data";

jest.mock("@/components/news/news-image", () =>
  jest.fn(() => <div data-testid="mock-news-image" />)
);

jest.mock("@/components/news/news-paragraph", () =>
  jest.fn(() => <p data-testid="mock-news-paragraph">Mock Paragraph</p>)
);

describe("NewsContent", () => {
  test("renders a single image when valid images count is less than or equal to 4", () => {
    render(
      <NewsContent
        images={generateMockNewsImages(3)}
        paragraphs={mockNewsParagraphs}
      />
    );
    expect(screen.getByTestId("mock-news-image")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-news-image")).toHaveLength(1);
  });

  test("renders multiple images when valid images count is more than 4", () => {
    render(
      <NewsContent
        images={generateMockNewsImages(5)}
        paragraphs={mockNewsParagraphs}
      />
    );
    expect(screen.getAllByTestId("mock-news-image")).toHaveLength(5);
  });

  test("renders nothing when there are no valid images", () => {
    render(<NewsContent images={[]} paragraphs={mockNewsParagraphs} />);
    expect(screen.queryByTestId("mock-news-image")).toBeNull();
    expect(screen.queryByTestId("mock-news-paragraph")).toBeNull();
  });

  test("renders paragraphs when images count is less than or equal to 4", () => {
    render(
      <NewsContent
        images={generateMockNewsImages(2)}
        paragraphs={mockNewsParagraphs}
      />
    );
    expect(screen.getAllByTestId("mock-news-paragraph")).toHaveLength(10);
  });

  test("does not render paragraphs when images count is more than 4", () => {
    render(
      <NewsContent
        images={generateMockNewsImages(8)}
        paragraphs={mockNewsParagraphs}
      />
    );
    expect(screen.queryByTestId("mock-news-paragraph")).toBeNull();
  });
});
