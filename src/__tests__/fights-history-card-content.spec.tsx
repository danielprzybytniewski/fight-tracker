import { render, screen } from "@testing-library/react";
import {
  mockAppFight,
  mockFightsHistoryCardContentProps,
} from "@/__mocks__/mock-data";
import FightsHistoryCardContent from "@/components/fights-history/fights-history-card-content";
import type { FightResult } from "@/types/fights-history-schema.types";

jest.mock("@/components/fights-history/fights-history-details", () =>
  jest.fn(({ label, value }: { label: string; value: string }) => (
    <div data-testid="fights-history-details">
      {label}: {value}
    </div>
  )),
);

jest.mock("@/components/fights-history/fights-history-result-badge", () =>
  jest.fn(({ result }: { result: FightResult }) => (
    <span data-testid="result-badge">{result.toUpperCase()}</span>
  )),
);

describe("FightsHistoryCardContent", () => {
  test("renders fight details correctly", () => {
    render(<FightsHistoryCardContent {...mockFightsHistoryCardContentProps} />);

    expect(screen.getAllByTestId("fights-history-details")).toHaveLength(8);
    expect(
      screen.getByText(`Date: ${mockAppFight.date.toLocaleDateString()}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${mockAppFight.location}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Opponent: ${mockAppFight.fighter2Name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Weight Class: ${mockAppFight.weightClass}`),
    ).toBeInTheDocument();
    expect(screen.getByTestId("result-badge")).toHaveTextContent("WIN");
    expect(
      screen.getByText(
        `Method: ${mockAppFight.method} (${mockAppFight.endWith})`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Round: Round ${mockAppFight.round}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Time: ${mockAppFight.time}`)).toBeInTheDocument();
  });
});
