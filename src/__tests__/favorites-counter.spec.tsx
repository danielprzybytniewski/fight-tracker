import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoritesCounter from "@/components/favorites/favorites-counter";

jest.mock("@/hooks/use-favorites");

describe("FavoritesCounter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with no favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
    });

    render(<FavoritesCounter />);

    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  test("renders correctly with some favorites", () => {
    const mockFavorites = [{ name: "Fighter 1" }, { name: "Fighter 2" }];

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
    });

    render(<FavoritesCounter />);

    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  test("renders a link to the favorites page", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
    });

    render(<FavoritesCounter />);

    const linkElement = screen.getByRole("link", { name: /(0)/i });
    expect(linkElement).toHaveAttribute("href", "/favorites");
  });
});
