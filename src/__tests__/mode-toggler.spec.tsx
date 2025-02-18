import ModeToggler from "@/components/mode-toggler";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ModeToggler", () => {
  let setThemeMock: jest.Mock<(theme: string) => void>;

  beforeEach(() => {
    jest.clearAllMocks();
    setThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: setThemeMock,
    });
  });

  test("renders the correct icon based on the theme", () => {
    const { rerender } = render(<ModeToggler />);

    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    (useTheme as jest.Mock).mockReturnValueOnce({
      theme: "dark",
      setTheme: setThemeMock,
    });
    rerender(<ModeToggler />);

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  test("toggles the theme when clicked", async () => {
    const { rerender } = render(<ModeToggler />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);
    expect(setThemeMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith("dark");

    (useTheme as jest.Mock).mockReturnValueOnce({
      theme: "dark",
      setTheme: setThemeMock,
    });
    rerender(<ModeToggler />);

    await user.click(button);
    expect(setThemeMock).toHaveBeenCalledTimes(2);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  test("has correct aria-label", () => {
    render(<ModeToggler />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
  });
});
