import AthleteLoading from "@/app/athlete/[fighterId]/loading";
import { render, screen } from "@testing-library/react";

describe("AthleteLoading", () => {
  test("renders correctly", () => {
    render(<AthleteLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
