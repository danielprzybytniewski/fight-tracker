import { render, screen } from "@testing-library/react";
import DivisionChampionCard from "@/components/division/division-champion-card";
import { mockDivisionWithChampion } from "@/__mocks__/mock-data";

jest.mock("@/components/shared/champion-badge", () =>
  jest.fn(() => <div data-testid="champion-badge">🏆 Champion</div>)
);

describe("DivisionChampionCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<DivisionChampionCard division={mockDivisionWithChampion} />);
  });

  test("renders the champion's name", () => {
    expect(
      screen.getByText(mockDivisionWithChampion.champion.championName)
    ).toBeInTheDocument();
  });

  test("renders the champion's image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockDivisionWithChampion.champion.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockDivisionWithChampion.champion.imgUrl)
        )
      );
      expect(image).toHaveAttribute(
        "alt",
        mockDivisionWithChampion.champion.championName
      );
    }
  });

  test("renders the champion's record", () => {
    const { wins, losses, draws } = mockDivisionWithChampion.champion;
    const expectedRecord = `${wins}-${losses}${draws !== 0 ? `-${draws}` : ""}`;
    expect(screen.getByText(`Record: ${expectedRecord}`)).toBeInTheDocument();
  });

  test("has the correct link", () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/athlete/${mockDivisionWithChampion.champion.id}`
    );
  });

  test("renders the ChampionBadge component", () => {
    expect(screen.getByTestId("champion-badge")).toBeInTheDocument();
  });
});
