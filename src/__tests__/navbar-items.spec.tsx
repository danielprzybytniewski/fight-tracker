import React from "react";
import { render, screen } from "@testing-library/react";
import NavbarItems from "@/components/navbar-items";

jest.mock("@/components/favorites-counter", () =>
  jest.fn(() => <div data-testid="favorites-counter">Favorites</div>)
);

jest.mock("@/components/mode-toggler", () =>
  jest.fn(() => <div data-testid="mode-toggler">Mode Toggler</div>)
);

describe("NavbarItems Component", () => {
  test("renders the UFC Rankings link with correct href and text", () => {
    render(<NavbarItems />);
    const linkElement = screen.getByRole("link", { name: /ufc rankings/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/rankings");
  });

  test("renders FavoritesCounter and ModeToggler components", () => {
    render(<NavbarItems />);
    expect(screen.getByTestId("favorites-counter")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggler")).toBeInTheDocument();
  });
});
