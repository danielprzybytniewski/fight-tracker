import ChampionBadge from "@/components/shared/champion-badge";
import { render, screen } from "@testing-library/react";

describe("ChampionBadge", () => {
  test("renders correctly", () => {
    render(<ChampionBadge />);
    const badgeElement = screen.getByText(/🏆 Champion/i);
    expect(badgeElement).toBeInTheDocument();
  });
});
