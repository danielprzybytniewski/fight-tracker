import { render, screen } from "@testing-library/react";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import { mockEventFightCard } from "@/__mocks__/mock-data";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";
import { MockEventFightCard } from "@/__mocks__/mock-components";

jest.mock("@/hooks/use-fetch-fight-cards");

describe("EventFightCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<MockEventFightCard title="Some Event" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: { message: "Network error" },
      refetch: jest.fn(),
    });

    render(<MockEventFightCard title="Some Event" />);

    expect(screen.getByText(/network error/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  test("renders not found state when no event matches", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<MockEventFightCard title="Nonexistent Event" />);

    expect(screen.getByText("Event Not Found!")).toBeInTheDocument();
  });

  test("renders fight card when data is loaded", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: mockEventFightCard,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<MockEventFightCard title={mockEventFightCard[0].title} />);

    expect(screen.getByText(mockEventFightCard[0].title)).toBeInTheDocument();

    const [{ fighterA, fighterB }] = mockEventFightCard[0].fights;

    ["A", "B"].forEach((fighter) => {
      const { firstName, lastName } = splitFighterFullName(
        fighter === "A" ? fighterA.name : fighterB.name
      );
      expect(screen.getByText(firstName)).toBeInTheDocument();
      expect(screen.getByText(lastName)).toBeInTheDocument();
    });

    expect(screen.getByText("VS")).toBeInTheDocument();
  });
});
