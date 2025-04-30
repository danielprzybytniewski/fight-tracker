import { render, screen } from "@testing-library/react";
import HomePageFeatureCard from "@/components/home-page/home-page-feature-card";
import type { Feature } from "@/types/home-page.types";

jest.mock("@/components/home-page/home-page-feature-icon", () =>
  jest.fn(() => <div data-testid="feature-icon">Mock Feature Icon</div>)
);

describe("HomePageFeatureCard", () => {
  const mockProps: Feature = {
    icon: "User",
    title: "Fighters",
    description:
      "Explore profiles of over 170 UFC fighters. Search and filter by weight class, discover their records, achievements and profiles.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<HomePageFeatureCard {...mockProps} />);
  });

  test("renders title and description correctly", () => {
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders feature icon correctly", () => {
    const iconElement = screen.getByTestId("feature-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
