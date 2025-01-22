import { render, screen } from "@testing-library/react";
import RankingsCard from "@/components/rankings-card";
import { mockDivision } from "@/__mocks__/mock-data";

jest.mock("@/components/champion-badge", () =>
  jest.fn(() => <div data-testid="champion-badge">🏆 Champion</div>)
);

describe("RankingsCard", () => {
  test("renders the division category name", () => {
    render(<RankingsCard division={mockDivision} />);
    expect(screen.getByText("Lightweight")).toBeInTheDocument();
  });

  test("renders the champion's name", () => {
    render(<RankingsCard division={mockDivision} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders the champion's image", () => {
    render(<RankingsCard division={mockDivision} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockDivision.champion.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockDivision.champion.imgUrl)
        )
      );
      expect(image).toHaveAttribute("alt", mockDivision.champion.championName);
    }
  });

  test("has the correct link", () => {
    render(<RankingsCard division={mockDivision} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/rankings/${mockDivision.id}`);
  });

  test("renders the ChampionBadge component", () => {
    render(<RankingsCard division={mockDivision} />);
    expect(screen.getByTestId("champion-badge")).toBeInTheDocument();
  });
});
