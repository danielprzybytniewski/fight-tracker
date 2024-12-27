import { mockEventFighter } from "@/__mocks__/mock-data";
import EventFighter from "@/components/event-fighter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fallbackImage from "../../public/images/og-image.png";

describe("EventFighter", () => {
  test("renders fighter image from url", () => {
    render(<EventFighter fighter={mockEventFighter} />);

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

    render(<EventFighter fighter={modifiedFighter} />);

    const fighterImage = screen.getByAltText(modifiedFighter.name);

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(fallbackImage.src))
    );
    expect(fighterImage).toHaveAttribute("alt", mockEventFighter.name);
  });

  test("renders fighter name as a clickable link", async () => {
    const user = userEvent.setup();
    render(<EventFighter fighter={mockEventFighter} />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(mockEventFighter.name);
    expect(link).toHaveAttribute("href", mockEventFighter.link);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await user.click(link);
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders fighter country flag", () => {
    render(<EventFighter fighter={mockEventFighter} />);
    const countryImage = screen.getByAltText(/jan kowalski country/i);

    expect(countryImage).toBeInTheDocument();
    expect(countryImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.country))
    );
  });

  test("renders fighter record", () => {
    render(<EventFighter fighter={mockEventFighter} />);
    const fighterRecord = screen.getByText(mockEventFighter.record);
    expect(fighterRecord).toBeInTheDocument();
  });
});
