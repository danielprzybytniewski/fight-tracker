import FavoritesPage, { metadata } from "@/app/favorites/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/favorites-fighters", () =>
  jest.fn(() => <div>Mocked Favorites Fighters</div>)
);

describe("FavoritesPage", () => {
  test("renders FavoritesFighters component", () => {
    render(<FavoritesPage />);

    expect(screen.getByText("Mocked Favorites Fighters")).toBeInTheDocument();
  });

  test("does not render any unexpected elements", () => {
    render(<FavoritesPage />);

    expect(screen.queryByText("Some unexpected text")).not.toBeInTheDocument();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("Favorites | Fight Tracker");
    expect(metadata.description).toBe("Your favorite fighters");
    expect(metadata.keywords).toContain("your favorite fighters");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("Favorites | Fight Tracker");
      expect(metadata.openGraph.description).toBe("Your favorite fighters");
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/favorites"
      );
    }
  });
});
