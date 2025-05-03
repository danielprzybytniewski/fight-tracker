"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ModeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="hover:opacity-70 focus-visible:ring-0 sm:py-2"
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
