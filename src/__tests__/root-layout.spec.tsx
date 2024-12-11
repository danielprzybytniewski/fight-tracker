import { render, screen, waitFor } from "@testing-library/react";
import { metadata } from "@/app/layout";

const MockLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <nav role="navigation">Navbar</nav>
    <main>{children}</main>
    <footer role="contentinfo">Footer</footer>
  </div>
);

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
});
