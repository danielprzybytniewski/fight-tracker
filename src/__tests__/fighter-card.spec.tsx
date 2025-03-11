import { render, screen } from "@testing-library/react";
import FighterCard from "@/components/fighters/fighter-card";
import { fighterCardMock } from "@/__mocks__/mock-data";

describe("FighterCard", () => {
  test("renders fighter name", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders fighter nickname", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    expect(screen.getByText('"The Destroyer"')).toBeInTheDocument();
  });

  test("renders fighter category", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    expect(screen.getByText("Heavyweight")).toBeInTheDocument();
  });

  test("renders wins, losses, and draws", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Losses")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders image with correct src and alt text", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    if (fighterCardMock.imgUrl) {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(fighterCardMock.imgUrl))
      );
      expect(image).toHaveAttribute("alt", fighterCardMock.name);
    }
  });

  test("links to the correct URL", () => {
    render(<FighterCard fighter={fighterCardMock} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/athlete/john-doe");
  });

  test("does not render nickname if not provided", () => {
    const fighterWithoutNickname = { ...fighterCardMock, nickname: "" };
    render(<FighterCard fighter={fighterWithoutNickname} />);
    expect(screen.queryByText('"The Destroyer"')).not.toBeInTheDocument();
  });

  test("does not render category if not provided", () => {
    const fighterWithoutCategory = { ...fighterCardMock, category: "" };
    render(<FighterCard fighter={fighterWithoutCategory} />);
    expect(screen.queryByText("Heavyweight")).not.toBeInTheDocument();
  });

  test("renders wins as 0 if not provided", () => {
    const fighterWithoutWins = { ...fighterCardMock, wins: undefined };
    render(<FighterCard fighter={fighterWithoutWins} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders losses as 0 if not provided", () => {
    const fighterWithoutLosses = { ...fighterCardMock, losses: undefined };
    render(<FighterCard fighter={fighterWithoutLosses} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders draws as 0 if not provided", () => {
    const fighterWithoutDraws = { ...fighterCardMock, draws: undefined };
    render(<FighterCard fighter={fighterWithoutDraws} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
