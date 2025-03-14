import { render, screen } from "@testing-library/react";
import EventsPage, { generateMetadata } from "@/app/events/[title]/page";

jest.mock("@/components/events/event-fight-card", () =>
  jest.fn(({ title }: { title: string }) => (
    <div>Mocked EventFightCard: {title}</div>
  ))
);

describe("EventsPage", () => {
  const mockParams = { title: "mock-event" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders EventFightCard with the correct title", async () => {
    render(await EventsPage({ params: Promise.resolve(mockParams) }));

    expect(
      screen.getByText("Mocked EventFightCard: mock-event")
    ).toBeInTheDocument();
  });

  test("generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve(mockParams),
    });

    expect(metadata.title).toBe("Mock Event | Fight Tracker");
    expect(metadata.description).toBe(
      "Check out the upcoming MMA event: Mock Event"
    );
    expect(metadata.keywords).toContain(
      "Mock Event event, Mock Event fighters"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("Mock Event | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out the upcoming MMA event: Mock Event"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/events/mock-event"
      );
    }
  });
});
