import { render, screen } from "@testing-library/react";
import LoadingContainer from "@/components/shared/loading-container";

jest.mock("@/components/shared/loading-spinner", () =>
  jest.fn(() => <div role="status" aria-label="Loading..."></div>)
);

describe("LoadingContainer", () => {
  test("renders loading spinner and default loading message", () => {
    render(<LoadingContainer />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  test("renders loading spinner and custom loading message", () => {
    const customMessage = "Please wait...";
    render(<LoadingContainer message={customMessage} />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    const loadingText = screen.getByText(customMessage);
    expect(loadingText).toBeInTheDocument();
  });
});
