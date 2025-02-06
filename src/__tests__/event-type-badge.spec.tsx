import { render, screen } from "@testing-library/react";
import EventTypeBadge from "@/components/event-type-badge";

describe("EventTypeBadge", () => {
  test("renders MAIN CARD badge when props isMainCard is true", () => {
    render(<EventTypeBadge isMainCard={true} />);
    const badge = screen.getByText("MAIN CARD");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-300");
  });

  test("renders PRELIMS badge when props isMainCard is false", () => {
    render(<EventTypeBadge isMainCard={false} />);
    const badge = screen.getByText("PRELIMS");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-200");
  });
});
