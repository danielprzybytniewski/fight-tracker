import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import FightsCarousel from "@/components/fights-carousel";
import LoadingFightsCards from "@/components/loading-fights-cards";
import { mockFightsCards } from "@/__mocks__/mock-data";
import { splitFighterFullName } from "@/lib/split-fighter-full-name";

jest.mock("@/hooks/use-fetch-fight-cards");
jest.mock("@/lib/split-fighter-full-name", () => ({
  splitFighterFullName: jest.fn((name) => {
    const [firstName, lastName] = name.split(" ");
    return { firstName, lastName };
  }),
}));

describe("FightsCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: <LoadingFightsCards />,
      error: null,
      refetch: jest.fn(),
    });

    render(<FightsCarousel />);

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

    render(<FightsCarousel />);

    const errorMessage = screen.getByText(
      "Network error occurred. Please check your connection and try again."
    );
    expect(errorMessage).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  test("renders fight cards when data is loaded", () => {
    (useFetchFightCards as jest.Mock).mockReturnValue({
      data: mockFightsCards,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<FightsCarousel />);
    expect(screen.getByText("Fight Night")).toBeInTheDocument();
    const fighterA = mockFightsCards[0].fights[0].fighterA;
    const { firstName: firstNameFighterA, lastName: lastNameFighterA } =
      splitFighterFullName(fighterA.name);

    expect(screen.getByText(firstNameFighterA)).toBeInTheDocument();
    expect(screen.getByText(lastNameFighterA)).toBeInTheDocument();
    expect(screen.getByText("VS")).toBeInTheDocument();
    const fighterB = mockFightsCards[0].fights[0].fighterB;
    const { firstName: firstNameFighterB, lastName: lastNameFighterB } =
      splitFighterFullName(fighterB.name);

    expect(screen.getByText(firstNameFighterB)).toBeInTheDocument();
    expect(screen.getByText(lastNameFighterB)).toBeInTheDocument();
  });
});
