import { render, screen } from "@testing-library/react";
import HomePageStats from "@/components/home-page/home-page-stats";

describe("HomePageStats", () => {
  const defaultProps = {
    value: "1930+",
    label: "UFC fights history",
  };

  test("renders value and label correctly", () => {
    render(<HomePageStats {...defaultProps} />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(defaultProps.value);

    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(defaultProps.label);
  });
});
