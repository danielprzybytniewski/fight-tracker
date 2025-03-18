import NotFoundFightCard from "@/components/events/not-found-fight-card";
import { render, screen } from "@testing-library/react";
import notFoundImg from "@/public/images/not-found.png";

describe("NotFoundFightCard", () => {
  test("renders correctly", () => {
    render(<NotFoundFightCard />);

    const image = screen.getByAltText(/not found/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(notFoundImg.src))
    );

    const mainText = screen.getByText(/event not found/i);
    expect(mainText).toBeInTheDocument();

    const subText = screen.getByText(
      /the event you are looking for does not exist/i
    );
    expect(subText).toBeInTheDocument();
  });
});
