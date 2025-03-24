import RankingsLoading from "@/app/rankings/loading";
import { render, screen } from "@testing-library/react";

describe("RankingsLoading", () => {
  beforeEach(() => {
    render(<RankingsLoading />);
  });

  test("renders correctly", () => {
    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });

  test("renders heading with correct text", () => {
    const heading = screen.getByText("UFC Rankings");
    expect(heading).toBeInTheDocument();
  });
});
