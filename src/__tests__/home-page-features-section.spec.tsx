import { render, screen } from "@testing-library/react";
import { features } from "@/components/home-page/home-page-data";
import HomePageFeaturesSection from "@/components/home-page/home-page-features-section";

describe("HomePageFeaturesSection", () => {
  beforeEach(() => {
    render(<HomePageFeaturesSection />);
  });

  test("renders heading correctly", () => {
    const heading = screen.getByRole("heading", { level: 2, name: "Features" });
    expect(heading).toBeInTheDocument();
  });

  test("renders feature cards correctly", () => {
    features.forEach((feature) => {
      const featureTitle = screen.getByText(feature.title);
      expect(featureTitle).toBeInTheDocument();

      const featureDescription = screen.getByText(feature.description);
      expect(featureDescription).toBeInTheDocument();
    });

    const lucideIcons = screen.getAllByText((_, element) =>
      element ? element.classList.contains("lucide") : false,
    );
    expect(lucideIcons).toHaveLength(features.length);
  });
});
