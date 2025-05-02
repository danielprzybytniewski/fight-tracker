import { render, screen } from "@testing-library/react";
import FavoritesLoading from "@/app/favorites/loading";

describe("FavoritesLoading", () => {
  beforeEach(() => {
    render(<FavoritesLoading />);
  });

  test("renders LoadingContainer with default message and spinner", () => {
    expect(
      screen.getByRole("status", { name: "Loading..." }),
    ).toBeInTheDocument();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders heading with correct text", () => {
    const heading = screen.getByText("Favorite Fighters");
    expect(heading).toBeInTheDocument();
  });
});
