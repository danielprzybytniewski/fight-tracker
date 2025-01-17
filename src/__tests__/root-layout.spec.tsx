import { render, screen, waitFor } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";
import { MockLayout } from "@/__mocks__/mock-components";

jest.mock("next/font/google", () => ({
  Roboto: jest.fn(() => ({
    className: "roboto-font",
  })),
}));

describe("RootLayout", () => {
  const setup = () =>
    render(
      <MockLayout>
        <div>Test Child</div>
      </MockLayout>
    );

  test("renders children passed to it", () => {
    setup();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("renders Navbar, Footer, main section", () => {
    setup();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("applies the correct Roboto font class to the body", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    await waitFor(() => {
      expect(container.querySelector("body")).toHaveClass("roboto-font");
    });

    consoleSpy.mockRestore();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("Upcoming MMA Events | Fight Tracker");
    expect(metadata.description).toBe(
      "Info about UFC rankings and upcoming MMA events"
    );
    expect(metadata.keywords).toEqual(
      "MMA, UFC, Mixed Martial Arts, fight events, upcoming fights, upcoming fight events, sports events, fight tracker, UFC rankings, rankings, athletes, fighters, best fighters, top fighters, favorites, favorite fighters, your favorite fighters, UFC fighters, divisions, champions, weight classes, weight divisions"
    );
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe(
        "Upcoming MMA Events | Fight Tracker"
      );
      expect(metadata.openGraph.description).toBe(
        "Info about UFC rankings and upcoming MMA events"
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png"
      );
      expect(metadata.openGraph.url).toBe("https://fight-tracker.vercel.app");
    }
  });
});
