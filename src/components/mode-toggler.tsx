"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggler() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="focus-visible:ring-0"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun
          data-testid="sun-icon"
          className="h-[1.2rem] w-[1.2rem] transition-all"
        />
      ) : (
        <Moon
          data-testid="moon-icon"
          className="h-[1.2rem] w-[1.2rem] transition-all"
        />
      )}
    </button>
  );
}
