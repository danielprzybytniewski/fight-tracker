import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FighterCard from "@/components/fighters/fighter-card";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { Fighter } from "@/types/rankings-schema.types";

jest.mock("@/hooks/use-favorites");
jest.mock("@/hooks/use-toast");

describe("FighterCard", () => {
  const mockToggleFavoriteWithToast = jest.fn();
  const mockIsFavorite = jest.fn();
  const mockToast = jest.fn();

  const fighterCardMock: Fighter = {
    id: "john-doe",
    name: "John Doe",
    nickname: "The Destroyer",
    category: "Heavyweight",
    wins: 20,
    losses: 3,
    draws: 1,
    imgUrl: "https://example.com/johndoe.jpg",
  };

  const renderComponent = (fighter = fighterCardMock) =>
    render(<FighterCard fighter={fighter} />);

  beforeEach(() => {
    jest.clearAllMocks();

    (useFavorites as jest.Mock).mockReturnValue({
      toggleFavoriteWithToast: mockToggleFavoriteWithToast,
      isFavorite: mockIsFavorite,
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });

    mockIsFavorite.mockReturnValue(false);
  });

  test("renders fighter name", () => {
    renderComponent();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders fighter nickname", () => {
    renderComponent();
    expect(screen.getByText('"The Destroyer"')).toBeInTheDocument();
  });

  test("renders fighter category", () => {
    renderComponent();
    expect(screen.getByText("Heavyweight")).toBeInTheDocument();
  });

  test("renders wins, losses, and draws", () => {
    renderComponent();
    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Losses")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders image with correct src and alt text", () => {
    renderComponent();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (fighterCardMock.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(fighterCardMock.imgUrl))
      );
      expect(image).toHaveAttribute("alt", fighterCardMock.name);
    }
  });

  test("links to the correct URL", () => {
    renderComponent();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/athlete/john-doe");
  });

  test("does not render nickname if not provided", () => {
    renderComponent({ ...fighterCardMock, nickname: "" });
    expect(screen.queryByText('"The Destroyer"')).not.toBeInTheDocument();
  });

  test("does not render category if not provided", () => {
    renderComponent({ ...fighterCardMock, category: "" });
    expect(screen.queryByText("Heavyweight")).not.toBeInTheDocument();
  });

  test("renders wins as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, wins: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders losses as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, losses: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders draws as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, draws: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("calls toggleFavoriteWithToast when favorite button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    await user.click(favoriteButton);

    expect(mockToggleFavoriteWithToast).toHaveBeenCalledWith(
      fighterCardMock,
      mockToast
    );
  });

  test("toggles favorite state and shows toast message", async () => {
    const user = userEvent.setup();
    renderComponent();

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });

    await user.click(favoriteButton);

    await waitFor(() => {
      expect(mockToggleFavoriteWithToast).toHaveBeenCalledWith(
        fighterCardMock,
        mockToast
      );
    });
  });

  test("applies correct button styles when fighter is not favorited", () => {
    mockIsFavorite.mockReturnValue(false);
    renderComponent();

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).not.toHaveClass("fill-red-500");
    expect(favoriteIcon).toHaveClass("text-red-500");
  });

  test("applies correct button styles when fighter is favorited", () => {
    mockIsFavorite.mockReturnValue(true);
    renderComponent();

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toHaveClass("fill-red-500");
    expect(favoriteIcon).toHaveClass("text-red-500");
  });
});
