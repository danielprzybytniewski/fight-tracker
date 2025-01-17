import { render, screen } from "@testing-library/react";
import EventsPage, { generateMetadata } from "@/app/events/[title]/page";

jest.mock("@/components/event-fight-card", () =>
  jest.fn(({ title }: { title: string }) => (
    <div>Mocked EventFightCard: {title}</div>
  ))
);

describe("EventsPage", () => {
  const mockParams = { title: "mock-event" };

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
    expect(metadata.title).toBe("MOCK-EVENT | Fight Tracker");
    expect(metadata.description).toBe(
      "Check out the upcoming MMA event: MOCK-EVENT"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("MOCK-EVENT | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out the upcoming MMA event: MOCK-EVENT"
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
