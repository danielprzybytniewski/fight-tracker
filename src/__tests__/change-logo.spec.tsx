import { render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "next-themes";
import ChangeLogo from "@/components/navbar/change-logo";
import lightLogo from "@/public/light-logo.png";
import darkLogo from "@/public/dark-logo.png";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ChangeLogo", () => {
  test("renders correct logo based on active theme", async () => {
    (useTheme as jest.Mock).mockReturnValueOnce({ theme: "light" });

    render(<ChangeLogo />);

    await waitFor(() => {
      const darkImg = screen.getAllByTestId("imgTestId")[0];
      expect(darkImg).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(darkLogo.src))
      );
    });

    (useTheme as jest.Mock).mockReturnValueOnce({ theme: "dark" });

    render(<ChangeLogo />);

    await waitFor(() => {
      const lightImg = screen.getAllByTestId("imgTestId")[0];
      expect(lightImg).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(lightLogo.src))
      );
    });

    (useTheme as jest.Mock).mockRestore();
  });
});
