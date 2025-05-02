import { render, screen } from "@testing-library/react";
import AthleteLoading from "@/app/athlete/[fighterId]/loading";

describe("AthleteLoading", () => {
  test("renders correctly", () => {
    render(<AthleteLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
