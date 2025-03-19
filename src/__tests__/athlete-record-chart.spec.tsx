import { render, screen } from "@testing-library/react";
import AthleteRecordChart from "@/components/athlete/athlete-record-chart";

describe("AthleteRecordChart", () => {
  const renderComponent = (wins: number, losses: number, draws: number) => {
    render(<AthleteRecordChart wins={wins} losses={losses} draws={draws} />);
  };

  test("renders the wins, losses, and draws correctly", () => {
    renderComponent(10, 5, 2);

    expect(screen.getByText("10W")).toBeInTheDocument();
    expect(screen.getByText("5L")).toBeInTheDocument();
    expect(screen.getByText("2D")).toBeInTheDocument();
  });

  test("calculates and renders percentages correctly", () => {
    renderComponent(10, 5, 5);

    expect(screen.getByText("50% Wins")).toBeInTheDocument();
    expect(screen.getByText("25% Losses")).toBeInTheDocument();
    expect(screen.getByText("25% Draws")).toBeInTheDocument();
  });

  test("renders only wins and losses when draws are zero", () => {
    renderComponent(15, 10, 0);

    expect(screen.getByText("15W")).toBeInTheDocument();
    expect(screen.getByText("10L")).toBeInTheDocument();
    expect(screen.queryByText("D")).not.toBeInTheDocument();
    expect(screen.getByText("60% Wins")).toBeInTheDocument();
    expect(screen.getByText("40% Losses")).toBeInTheDocument();
    expect(screen.queryByText("0% Draws")).not.toBeInTheDocument();
  });
});
