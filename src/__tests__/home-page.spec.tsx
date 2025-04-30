import { render, screen } from "@testing-library/react";
import { overviewSections } from "@/components/home-page/home-page-data";
import HomePage from "@/app/page";

jest.mock("@/components/home-page/home-page-hero-section", () =>
  jest.fn(() => <div data-testid="hero-section">Mock Hero Section</div>)
);

jest.mock("@/components/home-page/home-page-features-section", () =>
  jest.fn(() => <div data-testid="features-section">Mock Features Section</div>)
);

jest.mock("@/components/home-page/home-page-overview-section", () =>
  jest.fn(({ title }) => (
    <div data-testid="overview-section">
      <h2>{title}</h2>
    </div>
  ))
);

jest.mock("@/components/home-page/home-page-stats-section", () =>
  jest.fn(() => <div data-testid="stats-section">Mock Stats Section</div>)
);

jest.mock("@/components/home-page/home-page-mma-organizations-section", () =>
  jest.fn(() => (
    <div data-testid="mma-organizations-section">
      Mock MMA Organizations Section
    </div>
  ))
);

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<HomePage />);
  });

  test("renders hero section correctly", () => {
    const heroSection = screen.getByTestId("hero-section");
    expect(heroSection).toBeInTheDocument();
  });

  test("renders features section correctly", () => {
    const featuresSection = screen.getByTestId("features-section");
    expect(featuresSection).toBeInTheDocument();
  });

  test("renders all overview sections correctly", () => {
    const overviewSectionsRendered = screen.getAllByTestId("overview-section");
    expect(overviewSectionsRendered.length).toBe(overviewSections.length);

    overviewSections.forEach((section) => {
      const sectionTitle = screen.getByText(section.title);
      expect(sectionTitle).toBeInTheDocument();
    });
  });

  test("renders stats section correctly", () => {
    const statsSection = screen.getByTestId("stats-section");
    expect(statsSection).toBeInTheDocument();
  });

  test("renders MMA organizations section correctly", () => {
    const mmaOrganizationsSection = screen.getByTestId(
      "mma-organizations-section"
    );
    expect(mmaOrganizationsSection).toBeInTheDocument();
  });
});
