import { render, screen } from "@testing-library/react";
import { mockDivision } from "@/__mocks__/mock-data";
import RankingsCard from "@/components/rankings/rankings-card";

describe("RankingsCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RankingsCard division={mockDivision} />);
  });

  test("renders the division category name", () => {
    expect(screen.getByText("Lightweight")).toBeInTheDocument();
  });

  test("renders the champion's name", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders the champion's image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockDivision.champion.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(
          encodeURIComponent(mockDivision.champion.imgUrl),
        ),
      );
      expect(image).toHaveAttribute("alt", mockDivision.champion.championName);
    }
  });

  test("has the correct link", () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/rankings/${mockDivision.id}`);
  });
});
