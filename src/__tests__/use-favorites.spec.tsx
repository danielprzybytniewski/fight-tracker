import { renderHook, waitFor } from "@testing-library/react";
import { useFavorites } from "@/hooks/use-favorites";
import { FavoritesProvider } from "@/providers/favorites-provider";
import { mockFighter } from "@/__mocks__/mock-data";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const mockUseFavoritesHook = () =>
    renderHook(() => useFavorites(), { wrapper: FavoritesProvider });

  test("initializes with an empty favorites list and functions", () => {
    const { result } = mockUseFavoritesHook();

    expect(result.current.favorites).toEqual([]);
    expect(result.current).toMatchObject({
      favorites: [],
      toggleFavorite: expect.any(Function),
      isFavorite: expect.any(Function),
      resetFavorites: expect.any(Function),
    });
  });

  test("adds a fighter to favorites successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockFighter);
      expect(result.current.isFavorite(mockFighter)).toBe(true);
      expect(result.current.favorites).toEqual([mockFighter]);
      expect(localStorage.getItem("favoritesFighters")).toEqual(
        JSON.stringify([mockFighter])
      );
    });
  });

  test("removes a fighter from favorites successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockFighter);
      result.current.toggleFavorite(mockFighter);
      expect(result.current.isFavorite(mockFighter)).toBe(false);
      expect(result.current.favorites).toEqual([]);
      expect(localStorage.getItem("favoritesFighters")).toEqual("[]");
    });
  });

  test("resets favorites correctly", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockFighter);
      result.current.resetFavorites();
      expect(result.current.favorites).toEqual([]);
      expect(localStorage.getItem("favoritesFighters")).toBeNull();
    });
  });

  test("loads favorites from localStorage on mount", async () => {
    localStorage.setItem("favoritesFighters", JSON.stringify([mockFighter]));

    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockFighter]);
      expect(result.current.isFavorite(mockFighter)).toBe(true);
    });
  });

  test("throws an error when used outside FavoritesProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useFavorites());
    }).toThrow("useFavorites must be used within a FavoritesProvider");

    consoleSpy.mockRestore();
  });
});
