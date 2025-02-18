import { render, screen } from "@testing-library/react";
import {
  sortFightsByDate,
  transformFightDetails,
} from "@/lib/fights-history-transformer";
import FightsHistory from "@/components/fights-history";
import { mockAppFight, mockTransformedDetails } from "@/__mocks__/mock-data";

jest.mock("@/lib/fights-history-transformer", () => ({
  sortFightsByDate: jest.fn(),
  transformFightDetails: jest.fn(),
}));

jest.mock("@/components/gradient-heading", () =>
  jest.fn(() => <h2 data-testid="gradient-heading">UFC Fights History</h2>)
);

jest.mock("@/components/fights-history-card-content", () =>
  jest.fn(() => <div data-testid="fights-history-card-content" />)
);

const mockSortFightsByDate = sortFightsByDate as jest.Mock;
const mockTransformFightDetails = transformFightDetails as jest.Mock;

describe("FightsHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders GradientHeading correctly", () => {
    mockSortFightsByDate.mockReturnValue([]);
    render(<FightsHistory fightsHistory={[]} mainFighterName="Fighter A" />);
    expect(screen.getByTestId("gradient-heading")).toBeInTheDocument();
    expect(screen.getByText("UFC Fights History")).toBeInTheDocument();
  });

  test("renders correct message when no fights are present", () => {
    mockSortFightsByDate.mockReturnValue([]);
    render(<FightsHistory fightsHistory={[]} mainFighterName="Fighter A" />);
    expect(
      screen.getByText("UFC Fights History not found")
    ).toBeInTheDocument();
  });

  test("renders fight card correctly when fights are present", () => {
    mockSortFightsByDate.mockReturnValue([mockAppFight]);
    mockTransformFightDetails.mockReturnValue(mockTransformedDetails);
    render(
      <FightsHistory
        fightsHistory={[mockAppFight]}
        mainFighterName="Fighter A"
      />
    );

    expect(screen.getAllByTestId("fights-history-card-content")).toHaveLength(
      1
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
    render(
      <FightsHistory
        fightsHistory={multipleFights}
        mainFighterName="Fighter A"
      />
    );

    expect(screen.getAllByTestId("fights-history-card-content")).toHaveLength(
      2
    );
    expect(
      screen.getByText("UFC Fight Night: Lineker vs. Dodson")
    ).toBeInTheDocument();
    expect(screen.getByText("UFC 101")).toBeInTheDocument();
  });
});
