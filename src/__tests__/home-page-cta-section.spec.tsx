import { render, screen } from "@testing-library/react";
import HomePageCTASection from "@/components/home-page/home-page-cta-section";
import { routesConfig } from "@/config/routes-config";

describe("HomePageCTASection", () => {
  beforeEach(() => {
    render(<HomePageCTASection />);
  });

  test("renders heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Your Gateway to the World of MMA",
    });

    expect(heading).toBeInTheDocument();
  });

  test("renders the link button with correct href and text", () => {
    const linkElement = screen.getByRole("link", { name: "Get Started" });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", routesConfig.fighters);
  });
});
