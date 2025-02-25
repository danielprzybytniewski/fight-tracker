import { render, screen } from "@testing-library/react";
import EventWeightBadge from "@/components/events/event-weight-badge";

describe("EventWeightBadge", () => {
  test("renders the correct weight with one decimal place", () => {
    render(<EventWeightBadge weight={70.5} />);
    expect(screen.getByText("70.5 kg")).toBeInTheDocument();
  });

  test("rounds the weight to one decimal place", () => {
    render(<EventWeightBadge weight={65.67} />);
    expect(screen.getByText("65.7 kg")).toBeInTheDocument();
  });

  test("handles integer weights correctly", () => {
    render(<EventWeightBadge weight={80} />);
    expect(screen.getByText("80.0 kg")).toBeInTheDocument();
  });
});
