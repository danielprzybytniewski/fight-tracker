import { render, screen } from "@testing-library/react";
import { mockDivisionWithChampion } from "@/__mocks__/mock-data";
import DivisionChampionCard from "@/components/division/division-champion-card";

jest.mock("@/components/division/division-champion-badge", () =>
  jest.fn(() => <div data-testid="champion-badge">MockedChampionBadge</div>),
);

describe("DivisionChampionCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<DivisionChampionCard division={mockDivisionWithChampion} />);
  });

  test("renders the champion's name", () => {
    expect(
      screen.getByText(mockDivisionWithChampion.champion.championName),
    ).toBeInTheDocument();
  });

  test("renders the champion's image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockDivisionWithChampion.champion.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockDivisionWithChampion.champion.imgUrl),
        ),
      );
      expect(image).toHaveAttribute(
        "alt",
        mockDivisionWithChampion.champion.championName,
      );
    }
  });

  test("renders the champion's record", () => {
    const { wins, losses, draws } = mockDivisionWithChampion.champion;
    const expectedRecord = `${wins}-${losses}${draws !== 0 ? `-${draws}` : ""}`;
    expect(screen.getByText(`Record: ${expectedRecord}`)).toBeInTheDocument();
  });

  test("renders button with correct link", () => {
    const button = screen.getByRole("link", { name: /view athlete/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
      "href",
      `/athlete/${mockDivisionWithChampion.champion.id}`,
    );
  });

  test("renders the ChampionBadge component", () => {
    expect(screen.getByTestId("champion-badge")).toBeInTheDocument();
  });
});
