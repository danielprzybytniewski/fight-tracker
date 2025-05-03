import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/components/shared/loading-spinner";

describe("LoadingSpinner", () => {
  test("renders the loading spinner", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading...");
    expect(spinner).toHaveClass("animate-spin");
  });
});
