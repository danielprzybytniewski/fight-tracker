import { fireEvent, render, screen } from "@testing-library/react";
import { mockNewsItem } from "@/__mocks__/mock-data";
import NewsPreviewItem from "@/components/news/news-preview-item";
import { getFirstImageUrl } from "@/components/news/news-utils";
import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";
import slugify from "@/lib/slugify";

jest.mock("@/hooks/use-unoptimized-image", () => ({
  useUnoptimizedImage: jest.fn(),
}));

jest.mock("@/components/news/news-utils", () => ({
  getFirstImageUrl: jest.fn(),
}));

jest.mock("@/lib/slugify", () => jest.fn());

describe("NewsPreviewItem", () => {
  const mockHandleImageLoadError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (slugify as jest.Mock).mockReturnValue("exciting-mma-news");
    (getFirstImageUrl as jest.Mock).mockReturnValue(
      "https://example.com/image.jpg",
    );
    (useUnoptimizedImage as jest.Mock).mockReturnValue({
      unoptimized: false,
      handleImageLoadError: mockHandleImageLoadError,
    });
    render(<NewsPreviewItem newsItem={mockNewsItem} />);
  });

  test("renders the component with correct title", () => {
    expect(screen.getByText(mockNewsItem.title)).toBeInTheDocument();
  });

  test("renders an image with correct attributes", () => {
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(
        encodeURIComponent("https://example.com/image.jpg"),
      ),
    );
    expect(image).toHaveAttribute("alt", mockNewsItem.title);
  });

  test("calls slugify function with the correct title", () => {
    expect(slugify).toHaveBeenCalledWith(mockNewsItem.title);
  });

  test("renders a link with the correct slugified href", () => {
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/news/exciting-mma-news");
  });

  test("calls handleImageLoadError when image fails to load", () => {
    const image = screen.getByRole("img");

    fireEvent.error(image);
    expect(mockHandleImageLoadError).toHaveBeenCalled();
  });
});
