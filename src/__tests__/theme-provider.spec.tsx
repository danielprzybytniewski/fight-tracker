import { ThemeProvider } from "@/providers/theme-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

jest.mock("next-themes", () => ({
  ThemeProvider: jest.fn(({ children, theme = "light", ...props }) => {
    const [currentTheme, setCurrentTheme] = useState(theme);
    const toggleTheme = () =>
      setCurrentTheme((prev: string) => (prev === "light" ? "dark" : "light"));

    return (
      <div data-theme={currentTheme} {...props}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {children}
      </div>
    );
  }),
}));

describe("ThemeProvider", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
  });

  it("renders children correctly", () => {
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("forwards props correctly to NextThemesProvider", () => {
    expect(screen.getByText("Test Child").parentElement).toHaveAttribute(
      "data-theme",
      "light"
    );
  });

  it("toggles theme when user interacts", async () => {
    const user = userEvent.setup();
    const nextThemesProvider = screen.getByText("Test Child").parentElement;
    const button = screen.getByText("Toggle Theme");

    expect(nextThemesProvider).toHaveAttribute("data-theme", "light");

    await user.click(button);
    expect(nextThemesProvider).toHaveAttribute("data-theme", "dark");

    await user.click(button);
    expect(nextThemesProvider).toHaveAttribute("data-theme", "light");
  });
});
