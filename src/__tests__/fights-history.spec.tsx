import { render, screen } from "@testing-library/react";
import { mockAppFight } from "@/__mocks__/mock-data";
import FightsHistory from "@/components/fights-history/fights-history";
import {
  sortFightsByDate,
  transformFightDetails,
} from "@/lib/fights-history-transformer";
import type { Fight } from "@/types/fights-history-schema.types";

jest.mock("@/lib/fights-history-transformer", () => ({
  sortFightsByDate: jest.fn(),
  transformFightDetails: jest.fn(),
}));

jest.mock("@/components/shared/gradient-heading", () =>
  jest.fn(() => <h2 data-testid="gradient-heading">UFC Fights History</h2>),
);

jest.mock("@/components/fights-history/fights-history-card-content", () =>
  jest.fn(() => <div data-testid="fights-history-card-content" />),
);

const mockSortFightsByDate = sortFightsByDate as jest.Mock;
const mockTransformFightDetails = transformFightDetails as jest.Mock;

describe("FightsHistory", () => {
  const mockTransformedDetails = {
    opponentName: "Fighter B",
    result: "win",
    methodDisplay: "KO (punch)",
    roundDisplay: "2",
    timeDisplay: "2:30",
    locationDisplay: "USA",
    weightClassDisplay: "Lightweight",
  };

  const renderComponent = (fightsHistory: Fight[], mainFighterName: string) => {
    render(
      <FightsHistory
        fightsHistory={fightsHistory}
        mainFighterName={mainFighterName}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders GradientHeading correctly", () => {
    mockSortFightsByDate.mockReturnValue([]);
    renderComponent([], "Fighter A");
    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
    expect(screen.getByText("UFC Fights History")).toBeInTheDocument();
  });

  test("renders correct message when no fights are present", () => {
    mockSortFightsByDate.mockReturnValue([]);
    renderComponent([], "Fighter A");
    expect(
      screen.getByText("UFC Fights History not found"),
    ).toBeInTheDocument();
  });

  test("renders fight card correctly when fights are present", () => {
    mockSortFightsByDate.mockReturnValue([mockAppFight]);
    mockTransformFightDetails.mockReturnValue(mockTransformedDetails);
    renderComponent([mockAppFight], "Fighter A");

    expect(screen.getAllByTestId("fights-history-card-content")).toHaveLength(
      1,
    );
    expect(screen.getByText(mockAppFight.event)).toBeInTheDocument();
  });

  test("renders multiple fight cards correctly", () => {
    const multipleFights = [
      mockAppFight,
      { ...mockAppFight, id: "2", event: "UFC 101" },
    ];
    mockSortFightsByDate.mockReturnValue(multipleFights);
    mockTransformFightDetails.mockReturnValue(mockTransformedDetails);
    renderComponent(multipleFights, "Fighter A");

    expect(screen.getAllByTestId("fights-history-card-content")).toHaveLength(
      2,
    );
    expect(
      screen.getByText("UFC Fight Night: Lineker vs. Dodson"),
    ).toBeInTheDocument();
    expect(screen.getByText("UFC 101")).toBeInTheDocument();
  });
});
