import { render, screen } from "@testing-library/react";
import HomePageHeroSection from "@/components/home-page/home-page-hero-section";

jest.mock("@/components/fights-carousel/fights-carousel", () =>
  jest.fn(() => <div data-testid="fights-carousel">Mock Fights Carousel</div>),
);

describe("HomePageHeroSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<HomePageHeroSection />);
  });

  test("renders the main heading", () => {
    const title = screen.getByRole("heading", {
      level: 1,
      name: /Fight Tracker/i,
    });

    expect(title).toBeInTheDocument();
  });

  test("renders the subheading", () => {
    const subtitle = screen.getByRole("heading", {
      level: 2,
      name: /Dive Into the World of MMA/i,
    });

    expect(subtitle).toBeInTheDocument();
  });

  test("renders the FightsCarousel component", () => {
    const carousel = screen.getByTestId("fights-carousel");

    expect(carousel).toBeInTheDocument();
  });
});
