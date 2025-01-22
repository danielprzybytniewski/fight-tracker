import { render, screen } from "@testing-library/react";
import DivisionAthleteCard from "@/components/division-athlete-card";
import { mockAthleteCard } from "@/__mocks__/mock-data";

describe("DivisionAthleteCard", () => {
  test("renders the fighter's name", () => {
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
    expect(screen.getByText(mockAthleteCard.name)).toBeInTheDocument();
  });

  test("renders the fighter's image", () => {
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (mockAthleteCard.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(mockAthleteCard.imgUrl))
      );
      expect(image).toHaveAttribute("alt", mockAthleteCard.name);
    }
  });

  test("renders the fighter's record", () => {
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
    const { wins, losses, draws } = mockAthleteCard;
    const expectedRecord = `${wins}-${losses}${draws !== 0 ? `-${draws}` : ""}`;
    expect(screen.getByText(`Record: ${expectedRecord}`)).toBeInTheDocument();
  });

  test("renders the correct rank badge", () => {
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
    const badge = screen.getByText("#1");
    expect(badge).toBeInTheDocument();
  });

  test("has the correct link to the fighter's page", () => {
    render(<DivisionAthleteCard fighter={mockAthleteCard} index={0} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/athlete/${mockAthleteCard.id}`
    );
  });
});
