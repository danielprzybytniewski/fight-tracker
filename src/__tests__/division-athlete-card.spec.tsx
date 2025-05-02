import { render, screen } from "@testing-library/react";
import { mockAthleteCard } from "@/__mocks__/mock-data";
import DivisionAthleteCard from "@/components/division/division-athlete-card";

describe("DivisionAthleteCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
  });

  test("renders the fighter's name", () => {
    expect(screen.getByText(mockAthleteCard.name)).toBeInTheDocument();
  });

  test("renders the fighter's image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockAthleteCard.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(mockAthleteCard.imgUrl)),
      );
      expect(image).toHaveAttribute("alt", mockAthleteCard.name);
    }
  });

  test("renders the fighter's record", () => {
    const { wins, losses, draws } = mockAthleteCard;
    const expectedRecord = `${wins}-${losses}${draws !== 0 ? `-${draws}` : ""}`;
    expect(screen.getByText(`Record: ${expectedRecord}`)).toBeInTheDocument();
  });

  test("renders the correct rank badge", () => {
    const badge = screen.getByText("#1");
    expect(badge).toBeInTheDocument();
  });

  test("has the correct link to the fighter's page", () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/athlete/${mockAthleteCard.id}`,
    );
  });
});
