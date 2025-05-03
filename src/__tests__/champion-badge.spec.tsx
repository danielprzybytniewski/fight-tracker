import { render, screen } from "@testing-library/react";
import ChampionBadge from "@/components/division/division-champion-badge";

describe("ChampionBadge", () => {
  test("renders correctly", () => {
    render(<ChampionBadge />);
    const badgeElement = screen.getByText(/🏆 Champion/i);
    expect(badgeElement).toBeInTheDocument();
  });
});
