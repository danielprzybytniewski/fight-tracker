import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchFightsCards } from "@/actions/fights-cards-actions";
import { useFetchFightCards } from "@/hooks/use-fetch-fight-cards";
import { mockFightsCards } from "@/__mocks__/mock-data";

jest.mock("@/actions/fights-cards-actions");

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const mockUseFetchFightCardsHook = () => {
  const queryClient = createQueryClient();

  return renderHook(() => useFetchFightCards(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};

describe("useFetchFightCards", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches fight cards successfully", async () => {
    const mockFightCards = { data: mockFightsCards };
    (fetchFightsCards as jest.Mock).mockResolvedValue(mockFightCards);

    const { result } = mockUseFetchFightCardsHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockFightCards.data);
  });

  test("handles error while fetching fight cards", async () => {
    const mockError = new Error("Network error");
    (fetchFightsCards as jest.Mock).mockRejectedValue(mockError);

    const { result } = mockUseFetchFightCardsHook();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
  });

  test("returns empty array if no fight cards are available", async () => {
    const mockEmptyFightCards = { data: [] };
    (fetchFightsCards as jest.Mock).mockResolvedValue(mockEmptyFightCards);

    const { result } = mockUseFetchFightCardsHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });

  test("returns empty array if data is undefined", async () => {
    const mockUndefinedData = { data: undefined };
    (fetchFightsCards as jest.Mock).mockResolvedValue(mockUndefinedData);

    const { result } = mockUseFetchFightCardsHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
  });
});
