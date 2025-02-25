import { render, screen } from "@testing-library/react";
import LoadingFightsCards from "@/components/shared/loading-fights-cards";

jest.mock("@/components/shared/loading-spinner", () =>
  jest.fn(() => <div role="status" aria-label="Loading..."></div>)
);

describe("LoadingFightsCards", () => {
  test("renders loading spinner and loading message", () => {
    render(<LoadingFightsCards />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });
});
