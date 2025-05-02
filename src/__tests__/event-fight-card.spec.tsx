import { render, screen } from "@testing-library/react";
import { mockFightCards } from "@/__mocks__/mock-data";
import EventFightCard from "@/components/events/event-fight-card";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import slugify from "@/lib/slugify";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/use-fetch-fight-cards");

jest.mock("@/components/shared/back-button", () =>
  jest.fn(() => <div data-testid="back-button">Mocked BackButton</div>),
);

describe("EventFightCard", () => {
  const renderComponent = (slug: string) => {
    render(<EventFightCard slug={slug} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders fight card when data is loaded", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: mockFightCards,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderComponent(slugify(mockFightCards[0].title));

    expect(screen.getByText(mockFightCards[0].title)).toBeInTheDocument();

    const [{ fighterA, fighterB }] = mockFightCards[0].fights;

    ["A", "B"].forEach((fighter) => {
      const { firstName, lastName } = splitFighterFullName(
        fighter === "A" ? fighterA.name : fighterB.name,
      );
      expect(screen.getByText(firstName)).toBeInTheDocument();
      expect(screen.getByText(lastName)).toBeInTheDocument();
    });
    expect(screen.getByText("VS")).toBeInTheDocument();

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });

  test("renders loading state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderComponent("Some Event");

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: { message: "Network error" },
      refetch: jest.fn(),
    });

    renderComponent("Some Event");

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

    renderComponent("Nonexistent Event");

    expect(screen.getByText("Event Not Found!")).toBeInTheDocument();
  });
});
