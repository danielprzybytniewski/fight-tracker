import { render, screen } from "@testing-library/react";
import FighterCard from "@/components/fighters/fighter-card";
import { fighterCardMock } from "@/__mocks__/mock-data";

describe("FighterCard", () => {
  const renderComponent = (fighter = fighterCardMock) =>
    render(<FighterCard fighter={fighter} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders fighter name", () => {
    renderComponent();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders fighter nickname", () => {
    renderComponent();
    expect(screen.getByText('"The Destroyer"')).toBeInTheDocument();
  });

  test("renders fighter category", () => {
    renderComponent();
    expect(screen.getByText("Heavyweight")).toBeInTheDocument();
  });

  test("renders wins, losses, and draws", () => {
    renderComponent();
    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Losses")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders image with correct src and alt text", () => {
    renderComponent();
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
    renderComponent();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/athlete/john-doe");
  });

  test("does not render nickname if not provided", () => {
    renderComponent({ ...fighterCardMock, nickname: "" });
    expect(screen.queryByText('"The Destroyer"')).not.toBeInTheDocument();
  });

  test("does not render category if not provided", () => {
    renderComponent({ ...fighterCardMock, category: "" });
    expect(screen.queryByText("Heavyweight")).not.toBeInTheDocument();
  });

  test("renders wins as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, wins: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders losses as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, losses: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders draws as 0 if not provided", () => {
    renderComponent({ ...fighterCardMock, draws: undefined });
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
