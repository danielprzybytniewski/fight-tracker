import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import { FightCardsFighter } from "@/types/fight-cards-schema.types";
import { render, screen } from "@testing-library/react";

describe("FightsCarouselFighterProfile", () => {
  const mockFighter: FightCardsFighter = {
    name: "John Doe",
    record: "15-0",
    country: "England",
    picture: "https://example.com/fighter.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<FightsCarouselFighterProfile fighter={mockFighter} />);
  });

  test("renders fighter image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockFighter.picture))
    );
    expect(image).toHaveAttribute("alt", mockFighter.name);
  });
  test("renders fighter name", () => {
    const firstName = screen.getByText(/John/i);
    const lastName = screen.getByText(/Doe/i);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });
});
