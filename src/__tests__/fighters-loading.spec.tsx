import FightersLoading from "@/app/fighters/loading";
import { render, screen } from "@testing-library/react";

describe("FightersLoading", () => {
  test("renders correctly", () => {
    render(<FightersLoading />);

    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
