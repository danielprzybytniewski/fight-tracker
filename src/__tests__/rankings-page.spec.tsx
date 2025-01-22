import { render, screen } from "@testing-library/react";
import RankingsPage, { metadata } from "@/app/rankings/page";
import { getRankingsWithImages } from "@/actions/rankings-actions";
import { Division } from "@/types/rankings-schema.types";
import { mockRankings } from "@/__mocks__/mock-data";

jest.mock("@/actions/rankings-actions", () => ({
  getRankingsWithImages: jest.fn(),
}));

jest.mock("@/components/rankings-card", () =>
  jest.fn(({ division }: { division: Division }) => (
    <div data-testid="rankings-card">{division.categoryName}</div>
  ))
);

describe("RankingsPage", () => {
  beforeEach(() => {
    (getRankingsWithImages as jest.Mock).mockResolvedValue(mockRankings);
  });

  test("renders the page title", async () => {
    render(await RankingsPage());
    expect(screen.getByText("UFC Rankings")).toBeInTheDocument();
  });

  test("renders RankingsCard components for each division", async () => {
    render(await RankingsPage());
    const rankingsCards = screen.getAllByTestId("rankings-card");
    expect(rankingsCards).toHaveLength(mockRankings.length);
    expect(screen.getByText("Lightweight")).toBeInTheDocument();
    expect(screen.getByText("Heavyweight")).toBeInTheDocument();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("UFC Rankings | Fight Tracker");
    expect(metadata.description).toBe("Check out current UFC rankings");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("UFC Rankings | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out current UFC rankings"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/rankings"
      );
    }
  });
});
