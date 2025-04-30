import HomePageStats from "@/components/home-page/home-page-stats";
import { render, screen } from "@testing-library/react";

describe("HomePageStats", () => {
  const mockProps = {
    value: "1930+",
    label: "UFC fights history",
  };

  test("renders value and label correctly", () => {
    render(<HomePageStats {...mockProps} />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockProps.value);

    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(mockProps.label);
  });
});
