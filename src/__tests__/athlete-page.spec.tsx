import { render, screen, waitFor } from "@testing-library/react";
import AthletePage, { generateMetadata } from "@/app/athlete/[fighterId]/page";
import { getFighterDetails } from "@/actions/rankings.actions";
import { getFightsHistory } from "@/actions/fights-history.actions";
import {
  mockAthlete,
  mockGeneralDetails,
  mockAdditionalDetails,
  mockApiFight,
} from "@/__mocks__/mock-data";
import { DetailItem, Fighter } from "@/types/rankings-schema.types";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/actions/rankings.actions", () => ({
  getFighterDetails: jest.fn(),
}));

jest.mock("@/actions/fights-history.actions", () => ({
  getFightsHistory: jest.fn(),
}));

jest.mock("@/lib/athlete-get-details", () => ({
  getGeneralDetails: jest.fn(() => mockGeneralDetails),
  getAdditionalDetails: jest.fn(() => mockAdditionalDetails),
}));

jest.mock("@/components/athlete/athlete-record-chart", () =>
  jest.fn(({ wins, losses, draws }) => (
    <div>
      Mocked AthleteRecordChart: Wins {wins}, Losses {losses}, Draws {draws}
    </div>
  ))
);

jest.mock("@/components/athlete/athlete-details", () =>
  jest.fn(
    ({
      generalDetails,
      additionalDetails,
    }: {
      generalDetails: DetailItem[];
      additionalDetails: DetailItem[];
    }) => (
      <div>
        Mocked AthleteDetails
        <div>
          {generalDetails.map((item, index) => (
            <div key={index}>
              General - {item.label}: {item.value}
            </div>
          ))}
          {additionalDetails.map((item, index) => (
            <div key={index}>
              Additional - {item.label}: {item.value}
            </div>
          ))}
        </div>
      </div>
    )
  )
);

jest.mock("@/components/fights-history/fights-history", () =>
  jest.fn(() => <div data-testid="fights-history">Mocked FightsHistory</div>)
);

jest.mock("@/lib/normalize-name", () =>
  jest.fn((name: string) => `Normalized ${name}`)
);

jest.mock("@/components/shared/back-button", () =>
  jest.fn(() => <div data-testid="back-button">Mocked BackButton</div>)
);

describe("AthletePage", () => {
  const mockParams = { fighterId: "john-doe" };

  const mockUndefinedAthleteRecord: Partial<Fighter> = {
    wins: undefined,
    losses: undefined,
    draws: undefined,
  };

  const renderComponent = async () => {
    render(await AthletePage({ params: Promise.resolve(mockParams) }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFighterDetails as jest.Mock).mockResolvedValue(mockAthlete);
    (getFightsHistory as jest.Mock).mockResolvedValue(mockApiFight);
  });

  test("renders the athlete's record correctly", async () => {
    await renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(
          `Mocked AthleteRecordChart: Wins ${mockAthlete.wins}, Losses ${mockAthlete.losses}, Draws ${mockAthlete.draws}`
        )
      ).toBeInTheDocument();
    });
  });

  test("renders default athlete's record when data is undefined", async () => {
    (getFighterDetails as jest.Mock).mockResolvedValue(
      mockUndefinedAthleteRecord
    );

    await renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText("Mocked AthleteRecordChart: Wins 0, Losses 0, Draws 0")
      ).toBeInTheDocument();
    });
  });

  test("renders athlete details and general information", async () => {
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Mocked AthleteDetails")).toBeInTheDocument();

      mockGeneralDetails.forEach((detail) => {
        expect(
          screen.getByText(`General - ${detail.label}: ${detail.value}`)
        ).toBeInTheDocument();
      });

      mockAdditionalDetails.forEach((detail) => {
        expect(
          screen.getByText(`Additional - ${detail.label}: ${detail.value}`)
        ).toBeInTheDocument();
      });
    });
  });

  test("renders athlete's image", async () => {
    await renderComponent();

    await waitFor(() => {
      if (mockAthlete.imgUrl) {
        const image = screen.getByAltText(mockAthlete.name);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockAthlete.imgUrl);
      }
    });
  });

  test("renders athlete's name and nickname", async () => {
    await renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: mockAthlete.name })
      ).toBeInTheDocument();

      if (mockAthlete.nickname) {
        expect(
          screen.getByText(`"${mockAthlete.nickname}"`)
        ).toBeInTheDocument();
      }
    });
  });

  test("renders fights history", async () => {
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("fights-history")).toBeInTheDocument();
    });
  });

  test("renders back button correctly", async () => {
    await renderComponent();

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });

  test("generates correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve(mockParams),
    });

    expect(metadata.title).toBe("John Doe | Fight Tracker");
    expect(metadata.description).toBe(
      "Check out the info about athlete: John Doe"
    );
    expect(metadata.keywords).toContain(
      "John Doe profile, John Doe info, John Doe stats, John Doe fight history, John Doe UFC record, John Doe past fights, John Doe career highlights, John Doe UFC journey, John Doe fight results, John Doe UFC performance"
    );

    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("John Doe | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out the info about athlete: John Doe"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/athlete/john-doe"
      );
    }
  });
});
