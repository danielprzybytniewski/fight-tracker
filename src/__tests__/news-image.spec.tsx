import { render, screen, fireEvent } from "@testing-library/react";
import NewsImage from "@/components/news/news-image";
import { generateAltText } from "@/components/news/news-utils";
import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/news/news-utils", () => ({
  generateAltText: jest.fn(),
}));

jest.mock("@/hooks/use-unoptimized-image", () => ({
  useUnoptimizedImage: jest.fn(),
}));

describe("NewsImage", () => {
  const mockHandleImageLoadError = jest.fn();
  const mockSrc = "https://example.com/image.jpg";

  const renderComponent = (src: string = mockSrc) => {
    return render(<NewsImage src={src} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUnoptimizedImage as jest.Mock).mockReturnValue({
      unoptimized: false,
      handleImageLoadError: mockHandleImageLoadError,
    });
  });

  test("renders an image with the correct alt text", () => {
    const mockAltText = "example image";
    (generateAltText as jest.Mock).mockReturnValue(mockAltText);
    renderComponent();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockSrc))
    );
    expect(image).toHaveAttribute("alt", mockAltText);
    expect(generateAltText).toHaveBeenCalledWith(mockSrc);
  });

  test("renders an image with fallback alt text when generateAltText returns null", () => {
    (generateAltText as jest.Mock).mockReturnValue(null);
    renderComponent();
    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockSrc))
    );
    expect(image).toHaveAttribute("alt", "news image");
  });

  test("renders null when src does not start with https", () => {
    renderComponent("src/image.jpg");
    expect(screen.queryByRole("img")).toBeNull();
  });

  test("toggles zoom state and prevents scrolling when image is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toBeInTheDocument();

    await user.click(imageContainer);
    expect(screen.getByTestId("zoomed-image-container")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByTestId("zoomed-image-container"));
    expect(document.body.style.overflow).toBe("");
  });

  test("toggles zoom state when close button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const imageContainer = screen.getByTestId("image-container");
    await user.click(imageContainer);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(screen.queryByTestId("zoomed-image-container")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  test("renders zoomed image with correct attributes", async () => {
    const user = userEvent.setup();
    const mockAltText = "zoomed example image";
    (generateAltText as jest.Mock).mockReturnValue(mockAltText);
    renderComponent();

    const imageContainer = screen.getByTestId("image-container");
    await user.click(imageContainer);

    const zoomedImage = screen.getByTestId("zoomed-image");
    expect(zoomedImage).toBeInTheDocument();
    expect(zoomedImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockSrc))
    );
    expect(zoomedImage).toHaveAttribute("alt", mockAltText);
  });

  test("calls handleImageLoadError when image fails to load", () => {
    renderComponent();
    const image = screen.getByRole("img");

    fireEvent.error(image);
    expect(mockHandleImageLoadError).toHaveBeenCalled();
  });
});
