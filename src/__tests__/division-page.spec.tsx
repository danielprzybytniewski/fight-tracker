import { render, screen, waitFor } from "@testing-library/react";
import DivisionPage, {
  generateMetadata,
} from "@/app/rankings/[divisionId]/page";
import { getDivisionWithImages } from "@/actions/rankings-actions";
import { mockDivision } from "@/__mocks__/mock-data";

jest.mock("@/actions/rankings-actions", () => ({
  getDivisionWithImages: jest.fn(),
}));

jest.mock("@/components/division/division-champion-card", () =>
  jest.fn(({ division }) => (
    <div>Mocked DivisionChampionCard: {division.categoryName}</div>
  ))
);

jest.mock("@/components/division/division-athlete-card", () =>
  jest.fn(({ fighter, index }) => (
    <div>
      Mocked DivisionAthleteCard: {fighter.name} at rank {index + 1}
    </div>
  ))
);

jest.mock("@/components/shared/back-button", () =>
  jest.fn(() => <button>Mocked BackButton</button>)
);

describe("DivisionPage", () => {
  const mockParams = { divisionId: "lightweight" };

  beforeEach(() => {
    jest.clearAllMocks();
    (getDivisionWithImages as jest.Mock).mockResolvedValue(mockDivision);
  });

  test("renders the division champion and athlete cards", async () => {
    render(await DivisionPage({ params: Promise.resolve(mockParams) }));

    await waitFor(() => {
      expect(
        screen.getByText("Mocked DivisionChampionCard: Lightweight")
      ).toBeInTheDocument();

      mockDivision.fighters.forEach((fighter, index) => {
        expect(
          screen.getByText(
            `Mocked DivisionAthleteCard: ${fighter.name} at rank ${index + 1}`
          )
        ).toBeInTheDocument();
      });
    });
  });

  test("renders the back button", async () => {
    render(await DivisionPage({ params: Promise.resolve(mockParams) }));

    expect(screen.getByText("Mocked BackButton")).toBeInTheDocument();
  });

  test("renders the division title", async () => {
    render(await DivisionPage({ params: Promise.resolve(mockParams) }));

    expect(
      screen.getByRole("heading", { name: "Lightweight UFC Divison" })
    ).toBeInTheDocument();
  });

  test("generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve(mockParams),
    });

    expect(metadata.title).toBe("Lightweight UFC Division | Fight Tracker");
    expect(metadata.description).toBe(
      "Lightweight UFC division. Check out the current champion and top fighters in this weight class."
    );
    expect(metadata.keywords).toContain(
      "UFC Lightweight division, UFC Lightweight champion, UFC Lightweight fighters, UFC Lightweight rankings"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe(
        "Lightweight UFC Division | Fight Tracker"
      );
      expect(metadata.openGraph.description).toBe(
        "Lightweight UFC division. Check out the current champion and top fighters in this weight class."
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/rankings/lightweight"
      );
    }
  });
});
