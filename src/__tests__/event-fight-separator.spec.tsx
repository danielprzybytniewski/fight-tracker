import { render, screen } from "@testing-library/react";
import EventFightSeparator from "@/components/event-fight-separator";

jest.mock("@/components/event-type-badge", () =>
  jest.fn(({ isMainCard }) => (
    <div data-testid="event-type-badge">
      {isMainCard ? "MAIN CARD" : "PRELIMS"}
    </div>
  ))
);

jest.mock("@/components/event-weight-badge", () =>
  jest.fn(({ weight }) => (
    <div data-testid="event-weight-badge">{weight} kg</div>
  ))
);

describe("EventFightSeparator", () => {
  test('renders "VS" text', () => {
    render(<EventFightSeparator isMainCard={true} weight={93} />);
    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  test("renders correct badge type when props isMainCard is true", () => {
    render(<EventFightSeparator isMainCard={true} weight={93} />);
    const typeBadge = screen.getByTestId("event-type-badge");
    expect(typeBadge).toHaveTextContent("MAIN CARD");
  });

  test("renders correct badge type when props isMainCard is false", () => {
    render(<EventFightSeparator isMainCard={false} weight={93} />);
    const typeBadge = screen.getByTestId("event-type-badge");
    expect(typeBadge).toHaveTextContent("PRELIMS");
  });

  test("renders EventWeightBadge with correct weight prop", () => {
    render(<EventFightSeparator isMainCard={true} weight={93} />);
    const weightBadge = screen.getByTestId("event-weight-badge");
    expect(weightBadge).toHaveTextContent("93 kg");
  });
});
