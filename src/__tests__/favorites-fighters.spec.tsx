import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import FavoritesFighters from "@/components/favorites-fighters";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { mockFighter } from "@/__mocks__/mock-data";

jest.mock("@/hooks/use-favorites");
jest.mock("@/hooks/use-toast");
jest.mock("@/components/event-fighter", () =>
  jest.fn(() => <div data-testid="event-fighter">Mocked Fighter</div>)
);

describe("FavoritesFighters", () => {
  const mockResetFavorites = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  test("renders empty state when no favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      resetFavorites: mockResetFavorites,
    });

    render(<FavoritesFighters />);

    expect(screen.getByText("Favorite Fighters (0)")).toBeInTheDocument();
    expect(screen.getByText("No favorite fighters yet")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("renders favorites list when favorites exist", () => {
    const favorites = [mockFighter];

    (useFavorites as jest.Mock).mockReturnValue({
      favorites,
      resetFavorites: mockResetFavorites,
    });

    render(<FavoritesFighters />);

    expect(screen.getByText("Favorite Fighters (1)")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("event-fighter")).toBeInTheDocument();
  });

  test("handles reset favorites action", async () => {
    const favorites = [mockFighter];
    const user = userEvent.setup();

    (useFavorites as jest.Mock).mockReturnValue({
      favorites,
      resetFavorites: mockResetFavorites,
    });

    render(<FavoritesFighters />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockResetFavorites).toHaveBeenCalledTimes(1);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: expect.anything(),
        })
      );
    });
  });

  test("renders correct number of fighter cards", () => {
    const favorites = [
      { ...mockFighter, name: "Fighter 1" },
      { ...mockFighter, name: "Fighter 2" },
    ];

    (useFavorites as jest.Mock).mockReturnValue({
      favorites,
      resetFavorites: mockResetFavorites,
    });

    render(<FavoritesFighters />);

    expect(screen.getByText("Favorite Fighters (2)")).toBeInTheDocument();
    expect(screen.getAllByTestId("event-fighter")).toHaveLength(2);
  });
});
