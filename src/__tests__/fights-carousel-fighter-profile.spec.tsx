import { mockFighter } from "@/__mocks__/mock-data";
import FightsCarouselFighterProfile from "@/components/fights-carousel-fighter-profile";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FightsCarouselFighterProfile", () => {
  test("renders fighter image", () => {
    render(<FightsCarouselFighterProfile fighter={mockFighter} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockFighter.picture))
    );
    expect(image).toHaveAttribute("alt", mockFighter.name);
  });

  test("renders fighter name as a clickable link", async () => {
    const user = userEvent.setup();
    render(<FightsCarouselFighterProfile fighter={mockFighter} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(mockFighter.name);
    expect(link).toHaveAttribute("href", mockFighter.link);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await user.click(link);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
