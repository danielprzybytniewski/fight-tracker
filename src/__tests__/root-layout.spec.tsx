import { render, screen, waitFor } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "next-themes";
import { FavoritesProvider } from "@/providers/favorites-provider";

jest.mock("next/font/google", () => ({
  Roboto: jest.fn(() => ({
    className: "roboto-font",
  })),
}));

const MockLayout = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>
    <ThemeProvider>
      <FavoritesProvider>
        <div>
          <nav role="navigation">Navbar</nav>
          <main>{children}</main>
          <footer role="contentinfo">Footer</footer>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  </ReactQueryProvider>
);

describe("RootLayout", () => {
  const setup = () =>
    render(
      <MockLayout>
        <div>Test Child</div>
      </MockLayout>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      "MMA, UFC, Mixed Martial Arts, fight events, upcoming fights, upcoming fight events, sports events, fight tracker, UFC rankings, Current UFC rankings, rankings, athletes, UFC athletes, fighters, UFC fighters, best fighters, best UFC fighters, top fighters, top UFC fighters, favorites, favorite fighters, your favorite fighters, divisions, champions, weight classes, UFC weight classes, weight divisions, UFC weight divisions, UFC fight history, fighter records, past UFC events, fight results, UFC career, fighter performance, UFC matchups, fight statistics, UFC fight cards, historical fights, fighter journey, UFC timeline, fight analysis, UFC archives, fighter evolution, fighter progression"
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
