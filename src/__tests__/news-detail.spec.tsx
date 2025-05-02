import React from "react";
import { render, screen } from "@testing-library/react";
import { mockNewsItem } from "@/__mocks__/mock-data";
import NewsDetail from "@/components/news/news-detail";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/shared/back-button", () =>
  jest.fn(() => <div data-testid="back-button">Mocked BackButton</div>),
);

jest.mock("@/components/news/news-content", () =>
  jest.fn(() => <div data-testid="news-content">Mocked NewsContent</div>),
);

describe("NewsDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<NewsDetail newsItem={mockNewsItem} />);
  });

  test("renders news with correct title", () => {
    expect(
      screen.getByRole("heading", { name: mockNewsItem.title }),
    ).toBeInTheDocument();
  });

  test("renders author and categories", () => {
    expect(screen.getByText(mockNewsItem.author)).toBeInTheDocument();
    const categories = mockNewsItem.categories.split(";");
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("renders children components correctly", () => {
    const newsContent = screen.getByTestId("news-content");
    expect(newsContent).toBeInTheDocument();

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });
});
