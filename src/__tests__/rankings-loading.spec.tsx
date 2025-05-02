import { render, screen } from "@testing-library/react";
import RankingsLoading from "@/app/rankings/loading";

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
