import Navbar from "@/components/navbar";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/mode-toggler", () =>
  jest.fn(() => <div data-testid="mode-toggler">Mode Toggler</div>)
);

jest.mock("@/components/change-logo", () =>
  jest.fn(() => <div data-testid="change-logo">Logo</div>)
);

jest.mock("@/components/favorites-counter", () =>
  jest.fn(() => <div data-testid="favorites-counter">Favorites</div>)
);

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test("renders the navbar with logo and title", () => {
    expect(screen.getByTestId("change-logo")).toBeInTheDocument();
    expect(screen.getByText("Fight Tracker")).toBeInTheDocument();
  });

  test("renders the UFC Rankings link", () => {
    expect(screen.getByText("UFC Rankings")).toBeInTheDocument();
  });

  test("renders the favorites counter", () => {
    expect(screen.getByTestId("favorites-counter")).toBeInTheDocument();
  });

  test("renders the mode toggler", () => {
    expect(screen.getByTestId("mode-toggler")).toBeInTheDocument();
  });
});
