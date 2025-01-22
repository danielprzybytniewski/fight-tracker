import RankingsDivisionLoading from "@/app/rankings/[divisionId]/loading";
import { render, screen } from "@testing-library/react";

describe("RankingsDivisionLoading", () => {
  test("renders correctly", () => {
    render(<RankingsDivisionLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
