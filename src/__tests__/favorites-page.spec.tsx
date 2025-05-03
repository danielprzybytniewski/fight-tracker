import { render, screen } from "@testing-library/react";
import FavoritesPage, { metadata } from "@/app/favorites/page";

jest.mock("@/components/favorites/favorites-container", () =>
  jest.fn(() => <div>Mocked FavoritesContainer</div>),
);

describe("FavoritesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders FavoritesContainer component correctly", async () => {
    render(await FavoritesPage());

    expect(screen.getByText("Mocked FavoritesContainer")).toBeInTheDocument();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("Favorite Fighters | Fight Tracker");
    expect(metadata.description).toBe("Check out your favorite fighters");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe(
        "Favorite Fighters | Fight Tracker",
      );
      expect(metadata.openGraph.description).toBe(
        "Check out your favorite fighters",
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png",
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/favorites",
      );
    }
  });
});
