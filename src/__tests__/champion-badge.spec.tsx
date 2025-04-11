import ChampionBadge from "@/components/division/division-champion-badge";
import { render, screen } from "@testing-library/react";

describe("ChampionBadge", () => {
  test("renders correctly", () => {
    render(<ChampionBadge />);
    const badgeElement = screen.getByText(/🏆 Champion/i);
    expect(badgeElement).toBeInTheDocument();
  });
});
