import { mockEventFighter } from "@/__mocks__/mock-data";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fallbackImage from "../../public/images/og-image.png";
import { MockEventFighter } from "@/__mocks__/mock-components";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

jest.mock("@/hooks/use-favorites");
jest.mock("@/hooks/use-toast");

describe("EventFighter", () => {
  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFavorites as jest.Mock).mockReturnValue({
      toggleFavorite: mockToggleFavorite,
      isFavorite: mockIsFavorite,
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });

    mockIsFavorite.mockReturnValue(false);
  });

  test("renders fighter image from url", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const fighterImage = screen.getByAltText("Jan Kowalski");

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.picture))
    );
    expect(fighterImage).toHaveAttribute("alt", mockEventFighter.name);
  });

  test("renders fallback image when fighter image is not a valid URL", () => {
    const modifiedFighter = {
      ...mockEventFighter,
      picture: "/images/logo.png",
    };

    render(<MockEventFighter fighter={modifiedFighter} position="A" />);

    const fighterImage = screen.getByAltText(modifiedFighter.name);

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(fallbackImage.src))
    );
    expect(fighterImage).toHaveAttribute("alt", modifiedFighter.name);
  });

  test("renders fighter name as a clickable link", async () => {
    const user = userEvent.setup();
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(mockEventFighter.name);
    expect(link).toHaveAttribute("href", mockEventFighter.link);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await user.click(link);
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders fighter country flag", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const countryImage = screen.getByAltText(/jan kowalski country/i);

    expect(countryImage).toBeInTheDocument();
    expect(countryImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.country))
    );
  });

  test("renders fighter record", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const fighterRecord = screen.getByText(mockEventFighter.record);

    expect(fighterRecord).toBeInTheDocument();
  });

  test("toggles favorite state and shows correct toast messages", async () => {
    const user = userEvent.setup();

    mockIsFavorite.mockReturnValueOnce(false).mockReturnValueOnce(true);

    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    const favoriteIcon = screen.getByTestId("favorite-icon");

    expect(favoriteIcon).toHaveClass("text-gray-500");

    await user.click(favoriteButton);

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(mockEventFighter);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: expect.anything(),
        })
      );
    });

    await user.click(favoriteButton);

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(mockEventFighter);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: expect.anything(),
          variant: "destructive",
        })
      );
    });
  });

  test("applies correct CSS classes based on favorite status", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(true),
      toggleFavorite: jest.fn(),
    });

    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toHaveClass("fill-yellow-500");
    expect(favoriteIcon).toHaveClass("text-yellow-500");
  });
});
