import { ThemeProvider } from "next-themes";
import { render, screen, waitFor } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";
import { FavoritesProvider } from "@/providers/favorites-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

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
      </MockLayout>,
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
      </RootLayout>,
    );

    await waitFor(() => {
      expect(container.querySelector("body")).toHaveClass("roboto-font");
    });

    consoleSpy.mockRestore();
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("Dive Into the World of MMA | Fight Tracker");
    expect(metadata.description).toBe(
      "The ultimate MMA and UFC resource: Discover comprehensive profiles of top UFC fighters, current UFC rankings, event cards from organizations like UFC, PFL, RIZIN and ONE, breaking news from MMA world, interviews, betting odds, predictions and more, all in one place.",
    );
    expect(metadata.keywords).toEqual(
      "MMA, Mixed Martial Arts, UFC, Ultimate Fighting Championship, PFL, Professional Fighters League, ONE, ONE Championship, One Fighting Championship, BKFC, Bare Knuckle Fighting Championship, RIZIN, ESPN, ESPN MMA, fights, fight events, sport events, fight tracker, past fights, past MMA fights, past UFC fights, past PFL fights, past RIZIN fights, past ONE fights, previous fights, previous MMA fights, previous UFC fights, previous PFL fights, previous RIZIN fights, previous ONE fights, UFC rankings, current UFC rankings, rankings, athletes, UFC athletes, fighters, UFC fighters, best fighters, best UFC fighters, top fighters, top UFC fighters, favorites, favorite fighters, your favorite fighters, divisions, champions, weight classes, UFC weight classes, weight divisions, UFC weight divisions, UFC fight history, fighter records, past UFC events, fight results, UFC career, fighter performance, UFC matchups, fight statistics, UFC fight cards, historical fights, fighter journey, UFC timeline, fight analysis, UFC archives, fighter evolution, fighter progression, MMA news, UFC news, PFL news, combat sports news, latest MMA news, breaking MMA news, fight news, live fight coverage, MMA rumors, UFC rumors, PFL rumors, MMA opinions, UFC opinions, PFL opinions, MMA discussions, UFC discussions, PFL discussions, fight announcements, MMA updates, UFC updates, PFL updates, fight reports, MMA headlines, sports news MMA, fight world news, MMA event coverage, fighter interviews, MMA press releases, MMA press conference, fighter reactions, live MMA events, UFC fight results, expert fight analysis, UFC fight statistics, MMA controversies, UFC predictions, PFL predictions, MMA rankings updates, biggest UFC fights, MMA breaking stories, sports journalism MMA, UFC betting odds, fight industry news, MMA media reports, UFC weigh-in results, PFL weigh-in results",
    );
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe(
        "Dive Into the World of MMA | Fight Tracker",
      );
      expect(metadata.openGraph.description).toBe(
        "The ultimate MMA and UFC resource: Discover comprehensive profiles of top UFC fighters, current UFC rankings, event cards from organizations like UFC, PFL, RIZIN and ONE, breaking news from MMA world, interviews, betting odds, predictions and more, all in one place.",
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png",
      );
      expect(metadata.openGraph.url).toBe("https://fight-tracker.vercel.app");
    }
  });
});
