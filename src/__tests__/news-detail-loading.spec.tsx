import { render, screen } from "@testing-library/react";
import NewsDetailLoading from "@/app/news/[slug]/loading";

describe("NewsDetailLoading", () => {
  test("renders correctly", () => {
    render(<NewsDetailLoading />);
    const container = screen.getByLabelText("loading-container");
    expect(container).toBeInTheDocument();
  });
});
