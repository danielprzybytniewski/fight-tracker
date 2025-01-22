import RankingsLoading from "@/app/rankings/loading";
import { render, screen } from "@testing-library/react";

describe("RankingsLoading", () => {
  test("renders correctly", () => {
    render(<RankingsLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
