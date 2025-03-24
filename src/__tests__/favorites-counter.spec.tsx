import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoritesCounter from "@/components/favorites/favorites-counter";

jest.mock("@/hooks/use-favorites");

describe("FavoritesCounter", () => {
  const renderComponent = (favorites: Array<{ name: string }> = []) => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites });

    return render(<FavoritesCounter />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with no favorites", () => {
    renderComponent([]);

    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  test("renders correctly with some favorites", () => {
    renderComponent([{ name: "Fighter 1" }, { name: "Fighter 2" }]);

    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  test("renders a link to the favorites page", () => {
    renderComponent([]);

    const linkElement = screen.getByRole("link", { name: /(0)/i });
    expect(linkElement).toHaveAttribute("href", "/favorites");
  });
});
