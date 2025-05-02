import { render, screen } from "@testing-library/react";
import { mockLinks } from "@/__mocks__/mock-data";
import NavbarItems from "@/components/navbar/navbar-items";

jest.mock("@/components/favorites/favorites-counter", () =>
  jest.fn(() => <div data-testid="favorites-counter">Favorites</div>),
);

jest.mock("@/components/navbar/mode-toggler", () =>
  jest.fn(() => <div data-testid="mode-toggler">Mode Toggler</div>),
);

describe("NavbarItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<NavbarItems />);
  });

  test("renders all links with correct href and text", () => {
    mockLinks.forEach(({ href, label }) => {
      const link = screen.getByRole("link", {
        name: new RegExp(`${label}`, "i"),
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  test("renders FavoritesCounter and ModeToggler components", () => {
    expect(screen.getByTestId("favorites-counter")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggler")).toBeInTheDocument();
  });
});
