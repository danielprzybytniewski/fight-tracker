import { render, screen } from "@testing-library/react";
import EventFightSeparator from "@/components/events/event-fight-separator";

jest.mock("@/components/events/event-type-badge", () =>
  jest.fn(({ isMainCard }) => (
    <div data-testid="event-type-badge">
      {isMainCard ? "MAIN CARD" : "PRELIMS"}
    </div>
  ))
);

jest.mock("@/components/events/event-weight-badge", () =>
  jest.fn(({ weight }) => (
    <div data-testid="event-weight-badge">{weight} kg</div>
  ))
);

describe("EventFightSeparator", () => {
  const renderComponent = (props = { isMainCard: true, weight: 93 }) => {
    render(<EventFightSeparator {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "VS" text', () => {
    renderComponent();
    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  test("renders correct badge type when props isMainCard is true", () => {
    renderComponent();
    const typeBadge = screen.getByTestId("event-type-badge");
    expect(typeBadge).toHaveTextContent("MAIN CARD");
  });

  test("renders correct badge type when props isMainCard is false", () => {
    renderComponent({ isMainCard: false, weight: 93 });
    const typeBadge = screen.getByTestId("event-type-badge");
    expect(typeBadge).toHaveTextContent("PRELIMS");
  });

  test("renders EventWeightBadge with correct weight prop", () => {
    renderComponent();
    const weightBadge = screen.getByTestId("event-weight-badge");
    expect(weightBadge).toHaveTextContent("93 kg");
  });
});
