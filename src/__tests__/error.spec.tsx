import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import ErrorPage from "@/app/error";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ErrorPage", () => {
  const mockReset = jest.fn();
  const mockPush = jest.fn();
  const mockError = new Error("Test error");
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<ErrorPage error={mockError} reset={mockReset} />);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("renders the error message and image", () => {
    expect(
      screen.getByRole("heading", { name: "Something went wrong" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an unexpected error. Please try again later."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "error" })).toBeInTheDocument();
  });

  test("logs the error to the console", () => {
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "An error occurred:",
      expect.any(Error)
    );
  });

  test("triggers the reset function when clicking the Retry button", async () => {
    const user = userEvent.setup();

    const retryButton = screen.getByRole("button", { name: "Retry" });
    await user.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  test("navigates to the homepage when clicking the 'Go To Homepage button'", async () => {
    const user = userEvent.setup();

    const homeButton = screen.getByRole("button", { name: "Go To Homepage" });
    await user.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
