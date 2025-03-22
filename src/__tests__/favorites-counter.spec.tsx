import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoritesCounter from "@/components/favorites/favorites-counter";

jest.mock("@/hooks/use-favorites");

describe("FavoritesCounter", () => {
  const mockUseFavorites = (favorites: Array<{ name: string }> = []) => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with no favorites", () => {
    mockUseFavorites([]);
    render(<FavoritesCounter />);

    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  test("renders correctly with some favorites", () => {
    mockUseFavorites([{ name: "Fighter 1" }, { name: "Fighter 2" }]);
    render(<FavoritesCounter />);

    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  test("renders a link to the favorites page", () => {
    mockUseFavorites([]);
    render(<FavoritesCounter />);

    const linkElement = screen.getByRole("link", { name: /(0)/i });
    expect(linkElement).toHaveAttribute("href", "/favorites");
  });
});
