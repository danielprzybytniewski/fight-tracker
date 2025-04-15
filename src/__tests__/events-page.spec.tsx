import EventsPage, { metadata } from "@/app/events/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/fights-carousel/fights-carousel", () =>
  jest.fn(() => <div data-testid="fights-carousel">Mocked Fights Carousel</div>)
);

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h1 data-testid="gradient-heading">MMA Events</h1>)
);

describe("EventsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<EventsPage />);
  });

  test("renders FightsCarousel component correctly", () => {
    expect(screen.getByTestId("fights-carousel")).toBeInTheDocument();
  });

  test("renders GradientHeading component correctly", () => {
    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("MMA Events | Fight Tracker");
    expect(metadata.description).toBe("Info about MMA events");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("MMA Events | Fight Tracker");
      expect(metadata.openGraph.description).toBe("Info about MMA events");
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/events"
      );
    }
  });
});
