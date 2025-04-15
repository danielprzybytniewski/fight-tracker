import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import { useActiveLink } from "@/hooks/use-active-link";

jest.mock("@/hooks/use-favorites");

jest.mock("@/hooks/use-active-link", () => ({
  useActiveLink: jest.fn(),
}));

describe("FavoritesCounter", () => {
  const mockUseActiveLink = useActiveLink as jest.Mock;

  const renderComponent = (favorites: Array<{ name: string }> = []) => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites });

    return render(<FavoritesCounter />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActiveLink.mockReturnValue(false);
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

  test("renders correctly with no favorites", () => {
    renderComponent([]);

    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  test("applies correct classes when link is active", () => {
    mockUseActiveLink.mockImplementation((href) => href === "/favorites");
    renderComponent([]);

    const links = screen.getAllByRole("link", { name: /(0)/i });
    const activeLinks = links.filter((link) =>
      link.classList.contains("border-red-600")
    );

    expect(activeLinks[0]).toHaveAttribute("href", "/favorites");
  });

  test("applies correct classes when link is inactive", () => {
    mockUseActiveLink.mockImplementation((href) => href === "/favorites");
    renderComponent([]);

    const links = screen.getAllByRole("link", { name: /(0)/i });

    const inactiveLinks = links.filter(
      (link) => !link.classList.contains("border-red-600")
    );

    inactiveLinks.forEach((link) => {
      expect(link).toHaveClass("border-transparent");
    });
  });
});
