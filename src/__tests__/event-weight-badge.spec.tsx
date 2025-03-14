import { render, screen } from "@testing-library/react";
import EventWeightBadge from "@/components/events/event-weight-badge";

describe("EventWeightBadge", () => {
  const renderComponent = (props = { weight: 70.5 }) => {
    render(<EventWeightBadge {...props} />);
  };

  test("renders the correct weight with one decimal place", () => {
    renderComponent();
    expect(screen.getByText("70.5 kg")).toBeInTheDocument();
  });

  test("rounds the weight to one decimal place", () => {
    renderComponent({ weight: 65.7 });
    expect(screen.getByText("65.7 kg")).toBeInTheDocument();
  });

  test("handles integer weights correctly", () => {
    renderComponent({ weight: 80 });
    expect(screen.getByText("80.0 kg")).toBeInTheDocument();
  });
});
