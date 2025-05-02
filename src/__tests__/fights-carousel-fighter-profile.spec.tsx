import { render, screen } from "@testing-library/react";
import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import type { FightCardsFighter } from "@/types/fight-cards-schema.types";

describe("FightsCarouselFighterProfile", () => {
  const mockFighter: FightCardsFighter = {
    name: "John Doe",
    record: "15-0",
    country: "https://example.com/england.png",
    picture: "https://example.com/fighter.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<FightsCarouselFighterProfile fighter={mockFighter} />);
  });

  test("renders fighter image", () => {
    const image = screen.getByRole("img", { name: mockFighter.name });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockFighter.picture)),
    );
    expect(image).toHaveAttribute("alt", mockFighter.name);
  });

  test("renders fighter name", () => {
    const firstName = screen.getByText(/John/i);
    const lastName = screen.getByText(/Doe/i);

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });

  test("renders fighter country flag", () => {
    const countryImage = screen.getByAltText(/john doe country/i);

    expect(countryImage).toBeInTheDocument();
    expect(countryImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockFighter.country)),
    );
  });

  test("renders fighter record", () => {
    const fighterRecord = screen.getByText(mockFighter.record);

    expect(fighterRecord).toBeInTheDocument();
  });
});
