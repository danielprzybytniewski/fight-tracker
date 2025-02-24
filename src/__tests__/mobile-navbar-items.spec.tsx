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
  let onItemClick: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onItemClick = jest.fn();
    render(<MobileNavbarItems onItemClick={onItemClick} />);
  });

  test('renders the "UFC Rankings" link with correct href and text', () => {
    const linkElement = screen.getByRole("link", { name: /ufc rankings/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/rankings");
  });

  test("calls onItemClick props when clicking on the navbar item", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByTestId("favorites-counter"));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
