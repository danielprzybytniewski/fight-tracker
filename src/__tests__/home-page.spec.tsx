import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/fights-carousel", () =>
  jest.fn(() => <div>Mocked Fights Carousel</div>)
);

describe("HomePage", () => {
  test("renders FightsCarousel component", () => {
    render(<HomePage />);

    expect(screen.getByText("Mocked Fights Carousel")).toBeInTheDocument();
  });

  test("does not render any unexpected elements", () => {
    render(<HomePage />);

    expect(screen.queryByText("Some unexpected text")).not.toBeInTheDocument();
  });
});
