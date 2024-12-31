import { render, screen, waitFor } from "@testing-library/react";
import { metadata } from "@/app/layout";
import { MockLayout } from "@/__mocks__/mock-components";

describe("RootLayout", () => {
  const setup = () =>
    render(
      <MockLayout>
        <div>Test Child</div>
      </MockLayout>
    );

  test("renders children passed to it", async () => {
    setup();
    await waitFor(() =>
      expect(screen.getByText("Test Child")).toBeInTheDocument()
    );
  });

  test("renders Navbar, Footer, main section", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  test("sets the correct metadata", async () => {
    await waitFor(() => {
      expect(metadata.title).toBe("Fight Tracker");
      expect(metadata.description).toBe("Info about upcoming MMA events");
      expect(metadata.keywords).toContain("upcoming fights");
    });
  });

  test("sets the correct OpenGraph metadata", async () => {
    await waitFor(() => {
      if (metadata.openGraph) {
        expect(metadata.openGraph.title).toBe("Fight Tracker");
        expect(metadata.openGraph.description).toBe(
          "Info about upcoming MMA events"
        );
        expect(metadata.openGraph.images).toContain(
          "https://fight-tracker.vercel.app/images/og-image.png"
        );
        expect(metadata.openGraph.url).toBe("https://fight-tracker.vercel.app");
      }
    });
  });
});
