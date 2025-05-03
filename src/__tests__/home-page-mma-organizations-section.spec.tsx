import { render, screen } from "@testing-library/react";
import { logoImageKeys } from "@/components/home-page/home-page-data";
import HomePageMmaOrganizationsSection from "@/components/home-page/home-page-mma-organizations-section";

describe("HomePageMmaOrganizationsSection", () => {
  beforeEach(() => {
    render(<HomePageMmaOrganizationsSection />);
  });

  test("renders carousel correctly", () => {
    expect(
      screen.getByTestId("mma-organizations-carousel"),
    ).toBeInTheDocument();
  });

  test("renders all logos with correct alt texts and src attributes", () => {
    logoImageKeys.forEach((key) => {
      const image = screen.getByAltText(key);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", `/images/home-page/logo-${key}.svg`);
    });
  });
});
