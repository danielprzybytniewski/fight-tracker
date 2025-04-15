import { mockLinks } from "@/__mocks__/mock-data";
import MobileNavbarItems from "@/components/navbar/mobile-navbar-items";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/favorites/favorites-counter", () =>
  jest.fn(() => <div data-testid="favorites-counter">Favorites</div>)
);

jest.mock("@/components/navbar/mode-toggler", () =>
  jest.fn(() => <div data-testid="mode-toggler">Mode Toggler</div>)
);

describe("MobileNavbarItems", () => {
  const onItemClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<MobileNavbarItems onItemClick={onItemClick} />);
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

  test("calls onItemClick props when clicking on the navbar item", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByTestId("favorites-counter"));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  test("renders FavoritesCounter and ModeToggler components", () => {
    expect(screen.getByTestId("favorites-counter")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggler")).toBeInTheDocument();
  });
});
