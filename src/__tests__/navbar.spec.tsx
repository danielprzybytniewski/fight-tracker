import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar/navbar";

jest.mock("@/components/navbar/change-logo", () =>
  jest.fn(() => <div data-testid="change-logo">Logo</div>),
);

jest.mock("@/components/navbar/navbar-items", () =>
  jest.fn(() => <div data-testid="navbar-items">NavbarItems</div>),
);

jest.mock("@/components/navbar/mobile-menu", () =>
  jest.fn(() => <div data-testid="mobile-menu">MobileMenu</div>),
);

beforeEach(() => {
  jest.clearAllMocks();
  render(<Navbar />);
});

describe("Navbar", () => {
  test("renders navigation element", () => {
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  test("renders ChangeLogo component", () => {
    const changeLogo = screen.getByTestId("change-logo");
    expect(changeLogo).toBeInTheDocument();
  });

  test("renders Fight Tracker link with correct href", () => {
    const fightTrackerLink = screen.getByRole("link", {
      name: /fight tracker/i,
    });
    expect(fightTrackerLink).toBeInTheDocument();
    expect(fightTrackerLink).toHaveAttribute("href", "/");
  });

  test("renders NavbarItems component", () => {
    const navbarItems = screen.getByTestId("navbar-items");
    expect(navbarItems).toBeInTheDocument();
  });

  test("renders MobileMenu component", () => {
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toBeInTheDocument();
  });
});
