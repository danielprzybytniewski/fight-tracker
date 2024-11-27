import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

jest.mock("next/font/google", () => {
  return {
    Roboto: jest.fn(() => ({
      className: "roboto-font",
    })),
  };
});

describe("RootLayout", () => {
  const setup = () =>
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

  test("renders children passed to it", () => {
    setup();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("renders Navbar and Footer", () => {
    setup();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("renders the correct font class", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(container.querySelector("body")).toHaveClass("roboto-font");
  });

  test("sets the correct title", () => {
    expect(metadata.title).toBe("Fight Tracker");
  });

  test("sets the correct description", () => {
    expect(metadata.description).toBe("Info about upcoming MMA events");
  });

  test("sets the correct keywords", () => {
    expect(metadata.keywords).toContain("upcoming fights");
  });
});
