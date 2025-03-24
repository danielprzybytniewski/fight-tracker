import { render, screen } from "@testing-library/react";
import { mockFavoriteFighters } from "@/__mocks__/mock-data";
import {
  ToastResetContent,
  ToastToggleContent,
} from "@/components/favorites/favorites-toast-content";

describe("FavoritesToastContent", () => {
  test("renders ToastToggleContent for add action", () => {
    render(
      <ToastToggleContent fighter={mockFavoriteFighters[0]} actionType="add" />
    );

    expect(screen.getByText(/added to/i)).toBeInTheDocument();
  });

  test("renders ToastToggleContent for remove action", () => {
    render(
      <ToastToggleContent
        fighter={mockFavoriteFighters[0]}
        actionType="remove"
      />
    );

    expect(screen.getByText(/removed from/i)).toBeInTheDocument();
  });

  test("renders ToastResetContent for reset action", () => {
    render(<ToastResetContent />);

    expect(
      screen.getByText("All fighters removed from favorites!")
    ).toBeInTheDocument();
  });
});
