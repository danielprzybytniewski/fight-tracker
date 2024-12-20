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

    expect(metadata).toEqual({
      title: "MOCK-EVENT | Fight Tracker",
      description: "Upcoming MMA event: mock-event",
      openGraph: {
        title: "mock-event | Fight Tracker",
        description: "Upcoming MMA event: mock-event",
        images: ["https://fight-tracker.vercel.app/images/og-image.png"],
        type: "website",
        url: "https://fight-tracker.vercel.app/events/mock-event",
      },
    });
  });
});
