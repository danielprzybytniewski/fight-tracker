import { render, screen } from "@testing-library/react";
import RankingsDivisionLoading from "@/app/rankings/[divisionId]/loading";

describe("RankingsDivisionLoading", () => {
  test("renders correctly", () => {
    render(<RankingsDivisionLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
