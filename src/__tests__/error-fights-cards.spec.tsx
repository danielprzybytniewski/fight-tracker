import ErrorFightCards from "@/components/shared/error-fight-cards";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ErrorFightsCards", () => {
  const renderComponent = (props: {
    message: string;
    onRetry?: () => void;
  }) => {
    render(<ErrorFightCards {...props} />);
  };

  test("renders the error image and message for a general error", () => {
    renderComponent({ message: "Something went wrong" });

    const errorImage = screen.getByAltText("error");
    const errorMessage = screen.getByText(/something went wrong/i);

    expect(errorImage).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders  message for a network error", () => {
    renderComponent({ message: "Network error occurred" });

    const errorMessage = screen.getByText(/network error occurred/i);

    expect(errorMessage).toBeInTheDocument();
  });

  test("renders the retry button and calls the onRetry function", async () => {
    const user = userEvent.setup();
    const onRetryMock = jest.fn();
    renderComponent({ message: "Something went wrong", onRetry: onRetryMock });

    const retryButton = screen.getByRole("button", { name: "Retry" });
    await user.click(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  test("renders the 'Go to Homepage' link with correct href", async () => {
    const user = userEvent.setup();
    renderComponent({ message: "Network error occurred" });

    const homeLink = screen.getByRole("link", { name: "Go to Homepage" });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
