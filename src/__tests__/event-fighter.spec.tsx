import { mockEventFighter } from "@/__mocks__/mock-data";
import { render, screen } from "@testing-library/react";
import fallbackImage from "@/public/images/og-image.png";
import EventFighter from "@/components/events/event-fighter";

describe("EventFighter", () => {
  const renderComponent = (fighter = mockEventFighter) => {
    return render(<EventFighter fighter={fighter} />);
  };

  test("renders fighter image from url", () => {
    renderComponent();
    const fighterImage = screen.getByAltText("Jan Kowalski");

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.picture))
    );
    expect(fighterImage).toHaveAttribute("alt", mockEventFighter.name);
  });

  test("renders fallback image when fighter image is not a valid URL", () => {
    renderComponent({ ...mockEventFighter, picture: "/images/logo.png" });
    const fighterImage = screen.getByAltText(mockEventFighter.name);

    expect(fighterImage).toBeInTheDocument();
    expect(fighterImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(fallbackImage.src))
    );
    expect(fighterImage).toHaveAttribute("alt", mockEventFighter.name);
  });

  test("renders fighter name", () => {
    renderComponent();
    const firstName = screen.getByText(/Jan/i);
    const lastName = screen.getByText(/Kowalski/i);

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });

  test("renders fighter country flag", () => {
    renderComponent();
    const countryImage = screen.getByAltText(/jan kowalski country/i);

    expect(countryImage).toBeInTheDocument();
    expect(countryImage).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockEventFighter.country))
    );
  });

  test("renders fighter record", () => {
    renderComponent();
    const fighterRecord = screen.getByText(mockEventFighter.record);

    expect(fighterRecord).toBeInTheDocument();
  });
});
