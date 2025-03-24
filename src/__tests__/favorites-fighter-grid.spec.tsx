import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fighter } from "@/types/rankings-schema.types";
import FavoritesFighterGrid from "@/components/favorites/favorites-fighter-grid";
import { mockFavoriteFighters } from "@/__mocks__/mock-data";

describe("FavoritesFighterGrid", () => {
  const mockToggleFavoriteWithToast = jest.fn();

  const renderComponent = ({
    favorites = [] as Fighter[],
    toggleFavoriteWithToast = mockToggleFavoriteWithToast,
  }: {
    favorites?: Fighter[];
    toggleFavoriteWithToast?: jest.Mock;
  } = {}) => {
    return render(
      <FavoritesFighterGrid
        favorites={favorites}
        toggleFavoriteWithToast={toggleFavoriteWithToast}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders fighter name, nickname, and category correctly", () => {
    renderComponent({ favorites: mockFavoriteFighters });

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
    renderComponent({ favorites: mockFavoriteFighters });

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
    renderComponent({ favorites: mockFavoriteFighters });

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
    renderComponent({ favorites: mockFavoriteFighters });

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
    renderComponent({ favorites: mockFavoriteFighters });

    const incompleteFighterName = screen.getByText("Alexandre Pantoja");
    expect(incompleteFighterName).toBeInTheDocument();

    expect(screen.queryByText("The Destroyer")).not.toBeInTheDocument();
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
      mockFavoriteFighters[0]
    );
  });
});
