import { MockNavbar } from "@/__mocks__/mock-components";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  test("renders Navbar with Fight Tracker title as a link", () => {
    render(<MockNavbar />);
    const linkElement = screen.getByRole("link", { name: /Fight Tracker/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("renders logo", () => {
    render(<MockNavbar />);
    expect(screen.getByAltText(/Fight Tracker Logo/i)).toBeInTheDocument();
  });

  test("renders the ModeToggler", () => {
    render(<MockNavbar />);
    const toggler = screen.getByRole("button", { name: /Toggle theme/i });
    expect(toggler).toBeInTheDocument();
  });

  test("renders the FavoritesCounter", () => {
    render(<MockNavbar />);

    const countText = screen.getByText("(0)");
    expect(countText).toBeInTheDocument();
  });
});
