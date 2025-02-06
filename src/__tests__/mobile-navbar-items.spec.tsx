import MobileNavbarItems from "@/components/mobile-navbar-items";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/favorites-counter", () =>
  jest.fn(() => <div data-testid="favorites-counter">Favorites</div>)
);

jest.mock("@/components/mode-toggler", () =>
  jest.fn(() => <div data-testid="mode-toggler">Mode Toggler</div>)
);

describe("MobileNavbarItems", () => {
  let onItemClick: jest.Mock;

  beforeEach(() => {
    onItemClick = jest.fn();
  });

  test('renders the "UFC Rankings" link with correct href and text', () => {
    render(<MobileNavbarItems onItemClick={onItemClick} />);
    const linkElement = screen.getByRole("link", { name: /ufc rankings/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/rankings");
  });

  test("calls onItemClick props when clicking on the navbar item", async () => {
    const user = userEvent.setup();
    render(<MobileNavbarItems onItemClick={onItemClick} />);
    await user.click(screen.getByTestId("favorites-counter"));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
