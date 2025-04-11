import { render, screen } from "@testing-library/react";
import EventsPage, { generateMetadata } from "@/app/events/[slug]/page";

jest.mock("@/components/events/event-fight-card", () =>
  jest.fn(({ slug }: { slug: string }) => (
    <div>Mocked EventFightCard: {slug.toUpperCase()}</div>
  ))
);

describe("EventsPage", () => {
  const mockParams = { slug: "rizin-40" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders EventFightCard with the correct title", async () => {
    render(await EventsPage({ params: Promise.resolve(mockParams) }));

    expect(
      screen.getByText("Mocked EventFightCard: RIZIN-40")
    ).toBeInTheDocument();
  });

  test("generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve(mockParams),
    });

    expect(metadata.title).toBe("Rizin 40 | Fight Tracker");
    expect(metadata.description).toBe("Check out MMA event: Rizin 40");
    expect(metadata.keywords).toContain(
      "Rizin 40 event, Rizin 40 fights, Rizin 40 fighters"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("Rizin 40 | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out MMA event: Rizin 40"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/events/rizin-40"
      );
    }
  });
});
