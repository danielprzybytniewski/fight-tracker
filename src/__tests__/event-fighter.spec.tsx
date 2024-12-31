import { mockEventFighter } from "@/__mocks__/mock-data";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fallbackImage from "../../public/images/og-image.png";
import { MockEventFighter } from "@/__mocks__/mock-components";

describe("EventFighter", () => {
  test("renders fighter image from url", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const fighterImage = screen.getByAltText("Jan Kowalski");

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.picture))
    );
    expect(fighterImage).toHaveAttribute("alt", mockEventFighter.name);
  });

  test("renders fallback image when fighter image is not a valid URL", () => {
    const modifiedFighter = {
      ...mockEventFighter,
      picture: "/images/logo.png",
    };

    render(<MockEventFighter fighter={modifiedFighter} position="A" />);

    const fighterImage = screen.getByAltText(modifiedFighter.name);

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(fallbackImage.src))
    );
    expect(fighterImage).toHaveAttribute("alt", modifiedFighter.name);
  });

  test("renders fighter name as a clickable link", async () => {
    const user = userEvent.setup();
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(mockEventFighter.name);
    expect(link).toHaveAttribute("href", mockEventFighter.link);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await user.click(link);
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders fighter country flag", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const countryImage = screen.getByAltText(/jan kowalski country/i);

    expect(countryImage).toBeInTheDocument();
    expect(countryImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.country))
    );
  });

  test("renders fighter record", () => {
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const fighterRecord = screen.getByText(mockEventFighter.record);

    expect(fighterRecord).toBeInTheDocument();
  });

  test("renders and toggles the favorite state", async () => {
    const user = userEvent.setup();
    render(<MockEventFighter fighter={mockEventFighter} position="A" />);

    const favoriteIcon = screen.getByTestId("favorite-icon");
    const favoriteButton = screen.getByRole("button", { name: /favorite/i });

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveClass("text-gray-500");

    await user.click(favoriteButton);
    expect(favoriteIcon).toHaveClass("fill-yellow-500 text-yellow-500");

    await user.click(favoriteButton);
    expect(favoriteIcon).toHaveClass("text-gray-500");
  });
});
