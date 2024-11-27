import { render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "next-themes";
import ChangeLogo from "@/components/change-logo";
import lightLogo from "../../public/lightLogo.png";
import darkLogo from "../../public/darkLogo.png";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ChangeLogo", () => {
  test("should change the logo source based on the theme", async () => {
    (useTheme as jest.Mock).mockReturnValueOnce({ theme: "light" });

    render(<ChangeLogo />);

    await waitFor(() => {
      const img = screen.getAllByTestId("imgTestId")[0];
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(darkLogo.src))
      );
    });

    (useTheme as jest.Mock).mockReturnValueOnce({ theme: "dark" });

    render(<ChangeLogo />);

    await waitFor(() => {
      const img = screen.getAllByTestId("imgTestId")[0];
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(lightLogo.src))
      );
    });

    (useTheme as jest.Mock).mockRestore();
  });
});
