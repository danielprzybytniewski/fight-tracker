import NewsDetailLoading from "@/app/news/[slug]/loading";
import { render, screen } from "@testing-library/react";

describe("NewsDetailLoading", () => {
  test("renders correctly", () => {
    render(<NewsDetailLoading />);
    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
