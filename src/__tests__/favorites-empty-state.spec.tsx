import { render, screen } from "@testing-library/react";
import FavoritesEmptyState from "@/components/favorites/favorites-empty-state";

describe("FavoritesEmptyState", () => {
  beforeEach(() => {
    render(<FavoritesEmptyState />);
  });

  test("renders empty state message correctly", () => {
    expect(screen.getByText("No favorite fighters yet")).toBeInTheDocument();
  });

  test("renders link to fighters page", () => {
    const fighterLink = screen.getByRole("link", { name: /fighter/i });
    expect(fighterLink).toBeInTheDocument();
    expect(fighterLink).toHaveAttribute("href", "/fighters");
  });
});
