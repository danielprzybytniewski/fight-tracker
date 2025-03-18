import { renderHook, waitFor } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Fighter } from "@/types/rankings-schema.types";
import {
  useFightersFiltersAndPagination,
  UseFightersFiltersAndPaginationProps,
} from "@/hooks/use-fighters-filters-and-pagination";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("useFightersFiltersAndPagination", () => {
  const mockRouterPush = jest.fn();
  const mockSetIsLoading = jest.fn();

  const fightersMock: Fighter[] = Array.from({ length: 30 }, (_, i) => ({
    name: `Fighter ${i + 1}`,
    category: i % 2 === 0 ? "Heavyweight" : "Lightweight",
  }));

  const initialCategories = ["Heavyweight", "Lightweight"];

  const renderWithProps = (
    props: Partial<UseFightersFiltersAndPaginationProps>
  ) =>
    renderHook(() =>
      useFightersFiltersAndPagination({
        initialFighters: fightersMock,
        initialSearchQuery: "",
        initialCategory: null,
        initialCategories,
        initialPage: 1,
        setIsLoading: mockSetIsLoading,
        ...props,
      })
    );

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (usePathname as jest.Mock).mockReturnValue("/fighters");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    jest.clearAllMocks();
  });

  test("initializes with default filters correctly", async () => {
    const { result } = renderWithProps({});

    await waitFor(() => {
      expect(result.current.filters).toEqual({
        searchQuery: "",
        selectedCategory: null,
        currentPage: 1,
      });
      expect(result.current.filteredFighters.length).toBe(30);
      expect(result.current.paginatedFighters.length).toBe(12);
      expect(result.current.totalPages).toBe(3);
    });
  });

  describe("Search functionality", () => {
    test("filters fighters by search query", async () => {
      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handleSearchChange("fighter");
      });

      await waitFor(() => {
        expect(result.current.filters.searchQuery).toBe("fighter");
        expect(result.current.filteredFighters.length).toBeGreaterThan(0);
        expect(mockRouterPush).toHaveBeenCalledWith(
          "/fighters?search=fighter&page=1",
          { scroll: true }
        );
      });
    });

    test("resets category when search query is provided", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?category=heavyweight")
      );
      const { result } = renderWithProps({ initialCategory: "heavyweight" });

      expect(result.current.filters.selectedCategory).toBe("heavyweight");

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handleSearchChange("fighter");
      });

      expect(result.current.filters.searchQuery).toBe("fighter");
      expect(result.current.filters.selectedCategory).toBe(null);
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?search=fighter&page=1",
        { scroll: true }
      );
    });

    test("does not reset selectedCategory when search query is cleared", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?category=heavyweight")
      );

      const { result } = renderWithProps({ initialCategory: "heavyweight" });

      expect(result.current.filters.selectedCategory).toBe("heavyweight");

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handleSearchChange("");
      });

      expect(result.current.filters.selectedCategory).toBe("heavyweight");
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?category=heavyweight&page=1",
        { scroll: true }
      );
    });

    test("handles URL encoding of search query when changing pages", async () => {
      const complexSearchQuery = "Fighter & Champion";
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams(
          `?search=${encodeURIComponent(complexSearchQuery)}&page=1`
        )
      );

      const { result } = renderWithProps({
        initialSearchQuery: complexSearchQuery,
      });

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?search=Fighter%2520%2526%2520Champion&page=2",
        { scroll: true }
      );
    });
  });

  describe("Category filtering", () => {
    test("filters fighters by category", async () => {
      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handleCategoryChange("Heavyweight");
      });

      await waitFor(() => {
        expect(result.current.filters.selectedCategory).toBe("heavyweight");
        expect(
          result.current.filteredFighters.every(
            (f) => f.category === "Heavyweight"
          )
        ).toBeTruthy();
        expect(mockRouterPush).toHaveBeenCalledWith(
          "/fighters?category=heavyweight&page=1",
          { scroll: true }
        );
      });
    });

    test("handles null category in handleCategoryChange", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?category=heavyweight")
      );

      const { result } = renderWithProps({ initialCategory: "heavyweight" });

      expect(result.current.filters.selectedCategory).toBe("heavyweight");

      await waitFor(() => {
        result.current.handleCategoryChange(null);
      });

      expect(result.current.filters.selectedCategory).toBe(null);
      expect(mockRouterPush).toHaveBeenCalledWith("/fighters?page=1", {
        scroll: true,
      });
    });

    test("removes invalid category from URL parameters", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?category=invalidCategory")
      );

      const { result } = renderWithProps({
        initialCategory: "invalidCategory",
      });

      await waitFor(() => {
        expect(result.current.filters.selectedCategory).toBe(null);
        expect(mockRouterPush).toHaveBeenCalledWith("/fighters?", {
          scroll: true,
        });
      });
    });
  });

  describe("Pagination", () => {
    test("handles page change correctly", async () => {
      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      await waitFor(() => {
        expect(result.current.filters.currentPage).toBe(2);
        expect(mockRouterPush).toHaveBeenCalledWith("/fighters?page=2", {
          scroll: true,
        });
      });
    });

    test("resets page to first when changing search or category", async () => {
      const { result } = renderWithProps({ initialPage: 3 });

      await waitFor(() => {
        result.current.handleSearchChange("fighter");
      });

      await waitFor(() => {
        expect(result.current.filters.currentPage).toBe(1);
      });

      await waitFor(() => {
        result.current.handleCategoryChange("Lightweight");
      });

      await waitFor(() => {
        expect(result.current.filters.selectedCategory).toBe("lightweight");
        expect(result.current.filters.currentPage).toBe(1);
      });
    });

    test("handles invalid page number from URL params correctly", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?page=999")
      );

      const { result } = renderWithProps({ initialPage: 999 });

      await waitFor(() => {
        expect(result.current.filters.currentPage).toBe(1);
        expect(mockRouterPush).toHaveBeenCalledWith("/fighters?page=1", {
          scroll: true,
        });
      });
    });
  });

  describe("Loading state", () => {
    test("correctly handles loading state with setTimeout during page change", async () => {
      jest.useFakeTimers();

      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      jest.runAllTimers();
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);

      jest.useRealTimers();
    });

    test("correctly sets loading state during URL updates", async () => {
      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handleSearchChange("fighter");
      });

      await waitFor(() => {
        expect(mockSetIsLoading).toHaveBeenCalledWith(true);
        expect(mockRouterPush).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockSetIsLoading).toHaveBeenLastCalledWith(false);
      });
    });

    test("updates URL and loading state even if page number is unchanged", async () => {
      const { result } = renderWithProps({});

      jest.useFakeTimers();

      await waitFor(() => {
        result.current.handlePageChange(1);
      });

      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      expect(mockRouterPush).toHaveBeenCalledWith("/fighters?page=1", {
        scroll: true,
      });

      jest.runAllTimers();

      expect(mockSetIsLoading).toHaveBeenCalledWith(false);

      jest.useRealTimers();
    });
  });

  describe("URL parameter handling", () => {
    test("sets search and category params in the URL correctly", async () => {
      const { result } = renderWithProps({});

      await waitFor(() => {
        result.current.handleSearchChange("Fighter 1");
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenLastCalledWith(
          "/fighters?search=Fighter%25201&page=1",
          { scroll: true }
        );
      });

      await waitFor(() => {
        result.current.handleCategoryChange("Heavyweight");
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenLastCalledWith(
          "/fighters?search=Fighter%25201&category=heavyweight&page=1",
          { scroll: true }
        );
      });

      await waitFor(() => {
        result.current.handleSearchChange("Fighter 1");
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith(
          expect.stringContaining("search=Fighter%25201"),
          expect.anything()
        );
      });

      await waitFor(() => {
        result.current.handleCategoryChange("Lightweight");
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenLastCalledWith(
          "/fighters?search=Fighter%25201&category=lightweight&page=1",
          { scroll: true }
        );
      });
    });

    test("properly includes searchQuery in URL when changing pages", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?search=fighter&page=1")
      );

      const { result } = renderWithProps({ initialSearchQuery: "fighter" });

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?search=fighter&page=2",
        { scroll: true }
      );
    });

    test("properly includes selectedCategory in URL when changing pages", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?category=heavyweight&page=1")
      );

      const { result } = renderWithProps({ initialCategory: "heavyweight" });

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(3);
      });

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?category=heavyweight&page=3",
        { scroll: true }
      );
    });

    test("handles both searchQuery and selectedCategory in URL when changing pages", async () => {
      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?search=fighter&category=lightweight&page=1")
      );

      const { result } = renderWithProps({
        initialSearchQuery: "fighter",
        initialCategory: "lightweight",
      });

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?search=fighter&category=lightweight&page=2",
        { scroll: true }
      );
    });

    test("maintains URL parameters when staying on the same page", async () => {
      jest.useFakeTimers();

      (useSearchParams as jest.Mock).mockReturnValue(
        new URLSearchParams("?search=fighter&category=lightweight&page=2")
      );

      const { result } = renderWithProps({
        initialSearchQuery: "fighter",
        initialCategory: "lightweight",
        initialPage: 2,
      });

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(2);
      });

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/fighters?search=fighter&category=lightweight&page=2",
        { scroll: true }
      );

      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      jest.runAllTimers();
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);

      jest.useRealTimers();
    });

    test("handles empty query string when no filters are applied", async () => {
      jest.useFakeTimers();

      (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));

      const { result } = renderWithProps({});

      mockRouterPush.mockClear();

      await waitFor(() => {
        result.current.handlePageChange(1);
      });

      expect(mockRouterPush).toHaveBeenCalledWith("/fighters?page=1", {
        scroll: true,
      });

      mockRouterPush.mockClear();

      (useRouter as jest.Mock).mockReturnValue({
        push: (url: string, options: object) => {
          mockRouterPush(url, options);
        },
      });

      const mockEmptyParams = new URLSearchParams();
      (useSearchParams as jest.Mock).mockReturnValue(mockEmptyParams);

      const { rerender } = renderHook(() =>
        useFightersFiltersAndPagination({
          initialFighters: fightersMock,
          initialSearchQuery: "",
          initialCategory: null,
          initialCategories,
          initialPage: 1,
          setIsLoading: mockSetIsLoading,
        })
      );

      rerender();

      await waitFor(() => {
        result.current.handlePageChange(1);
      });

      jest.runAllTimers();
      jest.useRealTimers();
    });
  });
});
