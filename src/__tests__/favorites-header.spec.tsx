import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoritesHeader from "@/components/favorites/favorites-header";

describe("FavoritesHeader", () => {
  const mockResetFavorites = jest.fn();

  const defaultProps = {
    favoritesCount: 3,
    onResetFavorites: mockResetFavorites,
  };

  const renderComponent = (props = {}) => {
    return render(<FavoritesHeader {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correct heading", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /favorite fighters/i })
    ).toBeInTheDocument();
  });

  test("renders favorite fighters count correctly", () => {
    renderComponent();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  test("renders reset button when there are favorites", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /reset favorites/i })
    ).toBeInTheDocument();
  });

  test("does not render reset button when there are no favorites", () => {
    renderComponent({ favoritesCount: 0 });
    expect(
      screen.queryByRole("button", { name: /reset favorites/i })
    ).not.toBeInTheDocument();
  });

  test("calls onResetFavorites when reset button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ onResetFavorites: mockResetFavorites });

    await user.click(screen.getByRole("button", { name: /reset favorites/i }));

    expect(mockResetFavorites).toHaveBeenCalledTimes(1);
  });
});
