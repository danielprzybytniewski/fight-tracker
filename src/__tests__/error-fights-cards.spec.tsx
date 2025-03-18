import ErrorFightsCards from "@/components/shared/error-fights-cards";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ErrorFightsCards", () => {
  const renderComponent = (props: {
    message: string;
    onRetry?: () => void;
  }) => {
    render(<ErrorFightsCards {...props} />);
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
});
