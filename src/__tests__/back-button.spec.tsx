import BackButton from "@/components/back-button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  const mockRouter = { back: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<BackButton />);
  });

  test("renders the BackButton component", () => {
    const button = screen.getByRole("button", { name: /back button/i });
    expect(button).toBeInTheDocument();
  });

  test("displays the ArrowLeft icon with correct aria-label", () => {
    const icon = screen.getByLabelText(/arrow left icon/i);
    expect(icon).toBeInTheDocument();
  });

  test("calls router.back() when clicked", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /back button/i });
    await user.click(button);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
