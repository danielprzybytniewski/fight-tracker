import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/components/footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("renders footer with correct content", () => {
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();

    const creatorText = screen.getByText(/Daniel Przybytniewski/i);
    expect(creatorText).toBeInTheDocument();

    const copyrightText = screen.getByText(/Copyright ©/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test("link directs to correct URL", async () => {
    const user = userEvent.setup();

    const linkElement = screen.getByRole("link", {
      name: /Daniel Przybytniewski/i,
    });

    await user.click(linkElement);

    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/danielprzybytniewski/fight-tracker"
    );
  });
});
