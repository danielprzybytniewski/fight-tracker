import NewsLoading from "@/app/news/loading";
import { render, screen } from "@testing-library/react";

describe("NewsLoading", () => {
  beforeEach(() => {
    render(<NewsLoading />);
  });

  test("renders correctly", () => {
    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });

  test("renders heading with correct text", () => {
    const heading = screen.getByText("News");
    expect(heading).toBeInTheDocument();
  });
});
