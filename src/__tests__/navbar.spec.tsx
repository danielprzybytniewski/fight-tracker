import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";

const MockNavbar = () => (
  <ThemeProvider>
    <Navbar />
  </ThemeProvider>
);

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
});
