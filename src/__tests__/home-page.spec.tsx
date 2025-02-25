import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/fights-carousel/fights-carousel", () =>
  jest.fn(() => <div>Mocked Fights Carousel</div>)
);

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h1 data-testid="gradient-heading">Upcoming MMA Events</h1>)
);

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<HomePage />);
  });

  test("renders FightsCarousel component correctly", () => {
    expect(screen.getByText("Mocked Fights Carousel")).toBeInTheDocument();
  });

  test("renders GradientHeading component correctly", () => {
    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
    expect(screen.getByText("Upcoming MMA Events")).toBeInTheDocument();
  });
});
