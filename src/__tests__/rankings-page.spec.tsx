import { render, screen } from "@testing-library/react";
import RankingsPage, { metadata } from "@/app/rankings/page";
import { getRankingsWithImages } from "@/actions/rankings.actions";
import { Division } from "@/types/rankings-schema.types";
import { mockRankings } from "@/__mocks__/mock-data";

jest.mock("@/actions/rankings.actions", () => ({
  getRankingsWithImages: jest.fn(),
}));

jest.mock("@/components/rankings/rankings-card", () =>
  jest.fn(({ division }: { division: Division }) => (
    <div data-testid="rankings-card">{division.categoryName}</div>
  ))
);

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h1 data-testid="gradient-heading">UFC Rankings</h1>)
);

describe("RankingsPage", () => {
  const renderComponent = async () => {
    render(await RankingsPage());
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getRankingsWithImages as jest.Mock).mockResolvedValue(mockRankings);
  });

  test("renders GradientHeading component correctly", async () => {
    await renderComponent();

    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
    expect(screen.getByText("UFC Rankings")).toBeInTheDocument();
  });

  test("renders RankingsCard components for each division", async () => {
    await renderComponent();
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
