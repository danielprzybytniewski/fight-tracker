import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  test("renders the not found message and image", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "Page Not Found" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sorry, we could not find the page you are looking for.")
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "not found" })).toBeInTheDocument();
  });

  test("renders the 'Go to Homepage' link with correct href and simulates user interaction", async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const homeLink = screen.getByRole("link", { name: "Go to Homepage" });
    expect(homeLink).toBeInTheDocument();
    await user.click(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
