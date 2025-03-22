import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import FavoriteFighters from "@/components/favorites/favorite-fighters";
import { Fighter } from "@/types/rankings-schema.types";
import userEvent from "@testing-library/user-event";
import { mockFavoriteFighters } from "@/__mocks__/mock-data";

jest.mock("@/hooks/use-favorites");
jest.mock("@/hooks/use-toast");

describe("FavoriteFighters", () => {
  const mockToggleFavorite = jest.fn();
  const mockResetFavorites = jest.fn();
  const mockToast = jest.fn();

  const renderFavoriteFighters = ({
    favorites = [] as Fighter[],
    toggleFavoriteWithToast = mockToggleFavorite,
    resetFavoritesWithToast = mockResetFavorites,
    toast = mockToast,
  }: {
    favorites?: Fighter[];
    toggleFavoriteWithToast?: jest.Mock;
    resetFavoritesWithToast?: jest.Mock;
    toast?: jest.Mock;
  } = {}) => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites,
      toggleFavoriteWithToast,
      resetFavoritesWithToast,
    });
    (useToast as jest.Mock).mockReturnValue({ toast });

    return render(<FavoriteFighters />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders favorite fighters list", () => {
    renderFavoriteFighters({ favorites: mockFavoriteFighters });

    expect(screen.getByText("(3)")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  test("renders empty state when no favorites", () => {
    renderFavoriteFighters({ favorites: [] });

    expect(screen.getByText("No favorite fighters yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fighter/i })).toHaveAttribute(
      "href",
      "/fighters"
    );
  });

  test("calls toggleFavorite when remove button is clicked", async () => {
    const user = userEvent.setup();
    renderFavoriteFighters({ favorites: mockFavoriteFighters });

    await user.click(
      screen.getByRole("button", {
        name: `Remove ${mockFavoriteFighters[0].name} from favorites`,
      })
    );

    expect(mockToggleFavorite).toHaveBeenCalledWith(
      mockFavoriteFighters[0],
      mockToast
    );
  });

  test("resets favorites when reset button is clicked", async () => {
    const user = userEvent.setup();
    renderFavoriteFighters({ favorites: mockFavoriteFighters });

    await user.click(screen.getByRole("button", { name: /reset favorites/i }));

    expect(mockResetFavorites).toHaveBeenCalledWith(mockToast);
  });

  test("renders figter name, nickname, and category correctly", () => {
    renderFavoriteFighters({ favorites: mockFavoriteFighters });

    const firstFighterName = screen.getByText(mockFavoriteFighters[0].name);
    expect(firstFighterName).toBeInTheDocument();

    if (mockFavoriteFighters[0].nickname) {
      expect(
        screen.getByText(`"${mockFavoriteFighters[0].nickname}"`)
      ).toBeInTheDocument();
    }

    const firstFighterCategory = screen.getByText(
      mockFavoriteFighters[0].category
    );

    expect(firstFighterCategory).toBeInTheDocument();
  });

  test("renders fighter image correctly", () => {
    renderFavoriteFighters({ favorites: mockFavoriteFighters });
    const firstFighterImage = screen.getAllByRole("img")[0];
    expect(firstFighterImage).toBeInTheDocument();

    if (mockFavoriteFighters[0].imgUrl) {
      expect(firstFighterImage).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockFavoriteFighters[0].imgUrl)
        )
      );

      expect(firstFighterImage).toHaveAttribute(
        "alt",
        mockFavoriteFighters[0].name
      );
    }
  });

  test("renders fighter record correctly", () => {
    renderFavoriteFighters({ favorites: mockFavoriteFighters });
    const firstFighterWins = screen.getByText(
      `${mockFavoriteFighters[0].wins}W`
    );
    const firstFighterLosses = screen.getByText(
      `${mockFavoriteFighters[0].losses}L`
    );
    const firstFighterDraws = screen.getByText(
      `${mockFavoriteFighters[0].draws}D`
    );

    expect(firstFighterWins).toBeInTheDocument();
    expect(firstFighterLosses).toBeInTheDocument();
    expect(firstFighterDraws).toBeInTheDocument();
  });

  test("renders 0 for wins, losses, and draws if not provided", () => {
    renderFavoriteFighters({
      favorites: mockFavoriteFighters,
    });

    const incompleteFighterName = screen.getByText("Alexandre Pantoja");
    expect(incompleteFighterName).toBeInTheDocument();

    const incompleteFighterWins = screen.getByText("0W");
    const incompleteFighterLosses = screen.getByText("0L");
    const incompleteFighterDraws = screen.getByText("0D");

    expect(incompleteFighterWins).toBeInTheDocument();
    expect(incompleteFighterLosses).toBeInTheDocument();
    expect(incompleteFighterDraws).toBeInTheDocument();
  });

  test("does not render nickname if not provided", () => {
    renderFavoriteFighters({
      favorites: mockFavoriteFighters,
    });

    const incompleteFighterName = screen.getByText("Alexandre Pantoja");
    expect(incompleteFighterName).toBeInTheDocument();

    expect(screen.queryByText("The Destroyer")).not.toBeInTheDocument();
  });
});
