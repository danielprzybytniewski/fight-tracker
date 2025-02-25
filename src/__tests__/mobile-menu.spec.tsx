import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileMenu from "@/components/navbar/mobile-menu";

jest.mock("@/components/navbar/change-logo", () =>
  jest.fn(() => <div data-testid="change-logo">Logo</div>)
);

jest.mock("@/components/navbar/mobile-navbar-items", () =>
  jest.fn(({ onItemClick }) => (
    <div data-testid="mobile-navbar-items" onClick={onItemClick}>
      Mobile Navbar Items
    </div>
  ))
);

const getToggleButton = () =>
  screen.getByRole("button", { name: /toggle mobile menu/i });

const getFightTrackerLink = () =>
  screen.getByRole("link", { name: /fight tracker/i });

describe("MobileMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<MobileMenu />);
  });

  test("opens menu when toggle button is clicked", async () => {
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();

    await userEvent.click(getToggleButton());
    await waitFor(() => {
      expect(screen.getByText("Menu")).toBeInTheDocument();
      expect(getFightTrackerLink()).toBeInTheDocument();
    });
  });

  test("closes menu when Fight Tracker link is clicked", async () => {
    await userEvent.click(getToggleButton());
    await waitFor(() => expect(screen.getByText("Menu")).toBeInTheDocument());
    await userEvent.click(getFightTrackerLink());
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });

  test("closes menu when close button (X icon) is clicked", async () => {
    await userEvent.click(getToggleButton());
    await waitFor(() => expect(screen.getByText("Menu")).toBeInTheDocument());
    const closeButton = screen.getByRole("button", {
      name: /close mobile menu/i,
    });
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });

  test("closes menu when MobileNavbarItems is clicked", async () => {
    await userEvent.click(getToggleButton());
    await waitFor(() => expect(screen.getByText("Menu")).toBeInTheDocument());
    const mobileNavbarItems = screen.getByTestId("mobile-navbar-items");
    await userEvent.click(mobileNavbarItems);
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });
});
