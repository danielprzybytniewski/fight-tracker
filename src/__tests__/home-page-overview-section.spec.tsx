import { render, screen } from "@testing-library/react";
import HomePageOverviewSection from "@/components/home-page/home-page-overview-section";
import { overviewSections } from "@/components/home-page/home-page-data";

jest.mock("@/components/home-page/home-page-overview-item", () =>
  jest.fn(() => <div data-testid="overview-item">Mock Overview Item</div>)
);

describe("HomePageOverviewSection", () => {
  const mockSection = overviewSections[0];
  const renderComponent = (props = mockSection) =>
    render(<HomePageOverviewSection {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title and description correctly", () => {
    renderComponent();

    const title = screen.getByText(mockSection.title);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(mockSection.description);
    expect(description).toBeInTheDocument();
  });

  test("renders HomePageOverviewItem correctly", () => {
    renderComponent();
    const overviewItems = screen.getAllByTestId("overview-item");

    expect(overviewItems.length).toBe(mockSection.items.length);
    expect(overviewItems[0]).toBeInTheDocument();
  });

  test("renders the image with correct src and alt attributes", () => {
    renderComponent();

    const image = screen.getByAltText(mockSection.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(
        encodeURIComponent(
          `/images/home-page/showcase-${mockSection.imageKey}.webp`
        )
      )
    );
  });

  test("renders the link button with correct href and text", () => {
    renderComponent();

    const linkButton = screen.getByRole("link", { name: mockSection.linkText });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute("href", mockSection.linkHref);
  });

  test("renders correct background when section is reversed", () => {
    const reversedSection = { ...mockSection, isReversed: true };
    renderComponent(reversedSection);

    const section = screen.getByText(reversedSection.title).closest("section");
    expect(section).toHaveClass("bg-gray-50 dark:bg-gray-900");
  });

  test("applies custom background class when provided", () => {
    const customBgSection = {
      ...mockSection,
      customBgClass: "bg-red-500",
    };
    renderComponent(customBgSection);

    const section = screen.getByText(customBgSection.title).closest("section");
    expect(section).toHaveClass("bg-red-500");
  });
});
