import { render, waitFor } from "@testing-library/react";
import { getAllFighters } from "@/actions/rankings.actions";
import FightersPage, { metadata } from "@/app/fighters/page";
import FightersContainer from "@/components/fighters/fighters-container";

jest.mock("@/actions/rankings.actions", () => ({
  getAllFighters: jest.fn(),
}));

jest.mock("@/components/fighters/fighters-container", () =>
  jest.fn(() => <div data-testid="fighters-container" />),
);

describe("FightersPage", () => {
  const mockFighters = {
    "1": { name: "Fighter One", category: "Lightweight" },
    "2": { name: "Fighter Two", category: "Middleweight" },
    "3": { name: "Fighter Three", category: "Lightweight" },
  };

  const renderFightersPage = async (searchParams = {}) => {
    render(await FightersPage({ searchParams: Promise.resolve(searchParams) }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getAllFighters as jest.Mock).mockResolvedValue(mockFighters);
  });

  test("renders FightersContainer with correct props", async () => {
    await renderFightersPage({
      page: "2",
      search: "test",
      category: "middleweight",
    });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialFighters: [
            { id: "1", name: "Fighter One", category: "Lightweight" },
            { id: "2", name: "Fighter Two", category: "Middleweight" },
            { id: "3", name: "Fighter Three", category: "Lightweight" },
          ],
          initialCategories: ["Lightweight", "Middleweight"],
          initialSearchQuery: "test",
          initialCategory: "middleweight",
          initialPage: 2,
        }),
        {},
      );
    });
  });

  test("displays unique categories correctly", async () => {
    await renderFightersPage({ page: "1", search: "", category: "" });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialCategories: ["Lightweight", "Middleweight"],
        }),
        {},
      );
    });
  });

  test("correctly slugifies category parameter", async () => {
    await renderFightersPage({ category: "Light Heavyweight" });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialCategory: "light-heavyweight",
        }),
        {},
      );
    });
  });

  test("renders no categories if fighters data is empty", async () => {
    (getAllFighters as jest.Mock).mockResolvedValue({});
    await renderFightersPage({ page: "1" });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialCategories: [],
        }),
        {},
      );
    });
  });

  test("filters out null or undefined categories", async () => {
    const fightersWithNullCategories = {
      "1": { name: "Fighter One", category: "Lightweight" },
      "2": { name: "Fighter Two", category: null },
      "3": { name: "Fighter Three", category: undefined },
    };

    (getAllFighters as jest.Mock).mockResolvedValue(fightersWithNullCategories);
    await renderFightersPage();

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialCategories: ["Lightweight"],
        }),
        {},
      );
    });
  });

  test("correctly transforms fighter data and removes division suffixes", async () => {
    const fightersWithDivisions = {
      "1": { name: "Fighter One", category: "Lightweight Division" },
      "2": { name: "Fighter Two", category: "Middleweight Division" },
    };

    (getAllFighters as jest.Mock).mockResolvedValue(fightersWithDivisions);

    await renderFightersPage();

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialFighters: expect.arrayContaining([
            expect.objectContaining({
              id: "1",
              name: "Fighter One",
              category: "Lightweight",
            }),
          ]),
        }),
        {},
      );
    });
  });

  test("defaults to page 1 when page parameter is missing", async () => {
    await renderFightersPage();

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialPage: 1,
        }),
        {},
      );
    });
  });

  test("defaults to page 1 when page parameter is invalid", async () => {
    await renderFightersPage({ page: "abc" });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialPage: 1,
        }),
        {},
      );
    });
  });

  test("handles missing search and category parameters correctly", async () => {
    await renderFightersPage({ page: "3" });

    await waitFor(() => {
      expect(FightersContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          initialSearchQuery: "",
          initialCategory: null,
        }),
        {},
      );
    });
  });

  test("sets the correct metadata", () => {
    expect(metadata.title).toBe("UFC Fighters | Fight Tracker");
    expect(metadata.description).toBe("Check out best UFC fighters");
  });

  test("sets the correct OpenGraph metadata", () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe("UFC Fighters | Fight Tracker");
      expect(metadata.openGraph.description).toBe(
        "Check out best UFC fighters",
      );
      expect(metadata.openGraph.images).toContain(
        "https://fight-tracker.vercel.app/images/og-image.png",
      );
      expect(metadata.openGraph.url).toBe(
        "https://fight-tracker.vercel.app/fighters",
      );
    }
  });
});
