import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockFightCards } from "@/__mocks__/mock-data";
import FightsCarousel from "@/components/fights-carousel/fights-carousel";
import LoadingContainer from "@/components/shared/loading-container";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";

jest.mock("@/hooks/use-fetch-fight-cards");

jest.mock("@/components/events/event-fighter-separator", () =>
  jest.fn(({ isMainCard, weight }) => (
    <div data-testid="event-fighter-separator">
      <p>{isMainCard ? "MAIN" : "PRELIMS"}</p>
      <p>VS</p>
      <p>Weight: {weight}</p>
    </div>
  )),
);

jest.mock("@/components/fights-carousel/fights-carousel-fighter-profile", () =>
  jest.fn(({ fighter }) => (
    <div data-testid="fights-carousel-fighter-profile">
      <p>Fighter: {fighter.name}</p>
    </div>
  )),
);
describe("FightsCarousel", () => {
  const renderComponent = () => {
    render(<FightsCarousel />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders fights carousel when data is loaded", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: mockFightCards,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    renderComponent();

    const carousel = screen.getByTestId("fights-carousel");
    expect(carousel).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /fight night/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events/fight-night");

    const button = screen.getByRole("link", { name: /view fight card/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/events/fight-night");
  });

  test("renders child components correctly when data is loaded", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: mockFightCards,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    renderComponent();

    const separator = screen.getByTestId("event-fighter-separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveTextContent("MAIN");
    expect(separator).toHaveTextContent("VS");
    expect(separator).toHaveTextContent("Weight: 185");

    const fighters = screen.getAllByTestId("fights-carousel-fighter-profile");
    fighters.forEach((fighter) => {
      expect(fighter).toBeInTheDocument();
    });
    expect(fighters).toHaveLength(2);
    expect(fighters[0]).toHaveTextContent("Fighter: Jing Li");
    expect(fighters[1]).toHaveTextContent("Fighter: Adam Kowalski");
  });

  test("renders loading state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: <LoadingContainer />,
      error: null,
      refetch: jest.fn(),
    });

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state and refetches on retry", async () => {
    const refetchMock = jest.fn();
    const user = userEvent.setup();
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: { message: "Network error" },
      refetch: refetchMock,
    });

    renderComponent();

    const errorMessage = screen.getByText(
      "Network error occurred. Please check your connection and try again.",
    );
    expect(errorMessage).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
