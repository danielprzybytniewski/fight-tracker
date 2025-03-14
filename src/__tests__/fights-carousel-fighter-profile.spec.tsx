import { mockFighter } from "@/__mocks__/mock-data";
import FightsCarouselFighterProfile from "@/components/fights-carousel/fights-carousel-fighter-profile";
import { render, screen } from "@testing-library/react";

describe("FightsCarouselFighterProfile", () => {
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
