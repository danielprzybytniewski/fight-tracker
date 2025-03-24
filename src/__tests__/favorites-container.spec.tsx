import { render, screen } from "@testing-library/react";
import FavoritesContainer from "@/components/favorites/favorites-container";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { mockFavoriteFighters } from "@/__mocks__/mock-data";
import userEvent from "@testing-library/user-event";
import { Fighter } from "@/types/rankings-schema.types";

jest.mock("@/hooks/use-favorites");
jest.mock("@/hooks/use-toast");

jest.mock("@/components/favorites/favorites-header", () => {
  return jest.fn(({ favoritesCount, onResetFavorites }) => {
    return (
      <div>
        Mocked FavoritesHeader ({favoritesCount})
        <button onClick={onResetFavorites}>Reset Favorites</button>
      </div>
    );
  });
});

jest.mock("@/components/favorites/favorites-empty-state", () => {
  return jest.fn(() => <div>Mocked FavoritesEmptyState</div>);
});

jest.mock("@/components/favorites/favorites-fighter-grid", () => {
  return jest.fn(({ favorites, toggleFavoriteWithToast, toast }) => {
    return (
      <div>
        Mocked FavoritesFighterGrid
        <button onClick={() => toggleFavoriteWithToast(favorites[0], toast)}>
          Remove {favorites[0].name} from favorites
        </button>
      </div>
    );
  });
});

describe("FavoritesContainer", () => {
  const mockToggleFavoriteWithToast = jest.fn();
  const mockResetFavoritesWithToast = jest.fn();
  const mockToast = jest.fn();

  const renderComponent = ({
    favorites = [] as Fighter[],
    toggleFavoriteWithToast = mockToggleFavoriteWithToast,
    resetFavoritesWithToast = mockResetFavoritesWithToast,
    toast = mockToast,
  } = {}) => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites,
      toggleFavoriteWithToast,
      resetFavoritesWithToast,
    });
    (useToast as jest.Mock).mockReturnValue({ toast });

    return render(<FavoritesContainer />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders FavoritesHeader component correctly", () => {
    renderComponent({ favorites: mockFavoriteFighters });

    expect(screen.getByText("Mocked FavoritesHeader (3)")).toBeInTheDocument();
  });

  test("renders FavoritesFighterGrid when favorites exist", () => {
    renderComponent({ favorites: mockFavoriteFighters });

    expect(screen.getByText("Mocked FavoritesFighterGrid")).toBeInTheDocument();
  });

  test("renders FavoritesEmptyState when no favorites", () => {
    renderComponent({ favorites: [] });

    expect(screen.getByText("Mocked FavoritesEmptyState")).toBeInTheDocument();
  });

  test("calls resetFavoritesWithToast when reset button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ favorites: mockFavoriteFighters });

    await user.click(screen.getByRole("button", { name: /reset favorites/i }));

    expect(mockResetFavoritesWithToast).toHaveBeenCalledWith(mockToast);
    expect(mockResetFavoritesWithToast).toHaveBeenCalledTimes(1);
  });

  test("calls toggleFavoriteWithToast when remove button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ favorites: mockFavoriteFighters });

    await user.click(
      screen.getByRole("button", {
        name: `Remove ${mockFavoriteFighters[0].name} from favorites`,
      })
    );

    expect(mockToggleFavoriteWithToast).toHaveBeenCalledWith(
      mockFavoriteFighters[0],
      mockToast
    );
    expect(mockToggleFavoriteWithToast).toHaveBeenCalledTimes(1);
  });
});
