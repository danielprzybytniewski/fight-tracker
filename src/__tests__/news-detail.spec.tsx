import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NewsDetail from "@/components/news/news-detail";
import { mockNewsItem } from "@/__mocks__/mock-data";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/shared/back-button", () =>
  jest.fn(() => <div data-testid="back-button">Mocked BackButton</div>)
);

describe("NewsDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<NewsDetail newsItem={mockNewsItem} />);
  });

  test("renders the news title", () => {
    expect(
      screen.getByRole("heading", { name: mockNewsItem.title })
    ).toBeInTheDocument();
  });

  test("renders the author and date", () => {
    expect(screen.getByText(mockNewsItem.author)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockNewsItem.modified).toLocaleDateString())
    ).toBeInTheDocument();
  });

  test("renders categories", () => {
    const categories = mockNewsItem.categories.split(", ");
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("renders images and paragraphs", async () => {
    await waitFor(() => {
      expect(screen.getByRole("paragraph")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  test("renders back button", async () => {
    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });
});
