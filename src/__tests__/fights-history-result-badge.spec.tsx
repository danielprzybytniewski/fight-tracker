import { render, screen } from "@testing-library/react";
import FightsHistoryResultBadge from "@/components/fights-history-result-badge";

describe("FightsHistoryResultBadge", () => {
  const mockBaseClasses = "text-xs text-gray-100";

  test("renders with win result", () => {
    render(<FightsHistoryResultBadge result="win" />);
    const badge = screen.getByText("WIN");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(mockBaseClasses, "bg-green-600");
  });

  test("renders with draw result", () => {
    render(<FightsHistoryResultBadge result="draw" />);
    const badge = screen.getByText("DRAW");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(mockBaseClasses, "bg-yellow-500");
  });

  test("renders with loss result", () => {
    render(<FightsHistoryResultBadge result="loss" />);
    const badge = screen.getByText("LOSS");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(mockBaseClasses, "bg-red-600");
  });

  test("renders with custom className", () => {
    render(<FightsHistoryResultBadge result="win" className="custom-class" />);
    const badge = screen.getByText("WIN");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(mockBaseClasses, "custom-class");
  });
});
