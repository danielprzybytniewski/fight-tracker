import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFoundFightCard from "@/components/events/not-found-fight-card";
import notFoundImg from "@/public/images/not-found.png";

describe("NotFoundFightCard", () => {
  beforeEach(() => {
    render(<NotFoundFightCard />);
  });

  test("renders correctly", () => {
    const image = screen.getByAltText(/not found/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(notFoundImg.src)),
    );

    const mainText = screen.getByText(/event not found/i);
    expect(mainText).toBeInTheDocument();

    const subText = screen.getByText(
      /the event you are looking for does not exist/i,
    );
    expect(subText).toBeInTheDocument();
  });

  test("renders the 'Go to Home Page' link with correct href", async () => {
    const user = userEvent.setup();

    const homeLink = screen.getByRole("link", { name: "Go to Home Page" });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
