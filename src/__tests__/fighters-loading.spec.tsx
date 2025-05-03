import { render, screen } from "@testing-library/react";
import FightersLoading from "@/app/fighters/loading";

describe("FightersLoading", () => {
  beforeEach(() => {
    render(<FightersLoading />);
  });

  test("renders correctly", () => {
    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });

  test("renders heading with correct text", () => {
    const heading = screen.getByText("UFC Fighters");
    expect(heading).toBeInTheDocument();
  });
});
