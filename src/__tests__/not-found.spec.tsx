import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test("renders the not found message and image", () => {
    expect(
      screen.getByRole("heading", { name: "Page Not Found" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sorry, we could not find the page you are looking for.")
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "not found" })).toBeInTheDocument();
  });

  test("renders the 'Go to Landing Page' link with correct href", async () => {
    const user = userEvent.setup();

    const homeLink = screen.getByRole("link", { name: "Go to Landing Page" });
    expect(homeLink).toBeInTheDocument();
    await user.click(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
