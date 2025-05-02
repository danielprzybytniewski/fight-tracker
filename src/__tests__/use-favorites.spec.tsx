import { renderHook, waitFor } from "@testing-library/react";
import { mockAthlete } from "@/__mocks__/mock-data";
import { useFavorites } from "@/hooks/use-favorites";
import { FavoritesProvider } from "@/providers/favorites-provider";

describe("useFavorites", () => {
  const mockToast = jest.fn();

  const mockUseFavoritesHook = () =>
    renderHook(() => useFavorites(), { wrapper: FavoritesProvider });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("initializes with an empty favorites list and functions", () => {
    const { result } = mockUseFavoritesHook();

    expect(result.current.favorites).toEqual([]);
    expect(result.current).toMatchObject({
      favorites: [],
      toggleFavorite: expect.any(Function),
      toggleFavoriteWithToast: expect.any(Function),
      resetFavorites: expect.any(Function),
      resetFavoritesWithToast: expect.any(Function),
      isFavorite: expect.any(Function),
    });
  });

  test("adds a fighter to favorites successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockAthlete);
      expect(result.current.isFavorite(mockAthlete)).toBe(true);
      expect(result.current.favorites).toEqual([mockAthlete]);
      expect(localStorage.getItem("favoriteFighters")).toEqual(
        JSON.stringify([mockAthlete]),
      );
    });
  });

  test("removes a fighter from favorites successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockAthlete);
      result.current.toggleFavorite(mockAthlete);
      expect(result.current.isFavorite(mockAthlete)).toBe(false);
      expect(result.current.favorites).toEqual([]);
      expect(localStorage.getItem("favoriteFighters")).toEqual("[]");
    });
  });

  test("resets favorites correctly", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockAthlete);
      result.current.resetFavorites();
      expect(result.current.favorites).toEqual([]);
      expect(localStorage.getItem("favoriteFighters")).toBeNull();
    });
  });

  test("loads favorites from localStorage on mount", async () => {
    localStorage.setItem("favoriteFighters", JSON.stringify([mockAthlete]));

    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockAthlete]);
      expect(result.current.isFavorite(mockAthlete)).toBe(true);
    });
  });

  test("adds a fighter to favorites with toast successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavoriteWithToast(mockAthlete, mockToast);

      expect(result.current.isFavorite(mockAthlete)).toBe(true);

      expect(mockToast).toHaveBeenCalledWith({
        description: expect.any(Object),
        variant: "default",
      });

      expect(localStorage.getItem("favoriteFighters")).toEqual(
        JSON.stringify([mockAthlete]),
      );
    });
  });

  test("removes a fighter from favorites with toast successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockAthlete);

      result.current.toggleFavoriteWithToast(mockAthlete, mockToast);

      expect(result.current.isFavorite(mockAthlete)).toBe(false);

      expect(mockToast).toHaveBeenCalledWith({
        description: expect.any(Object),
        variant: "default",
      });

      expect(localStorage.getItem("favoriteFighters")).toEqual("[]");
    });
  });

  test("resets favorites with toast successfully", async () => {
    const { result } = mockUseFavoritesHook();

    await waitFor(() => {
      result.current.toggleFavorite(mockAthlete);

      result.current.resetFavoritesWithToast(mockToast);

      expect(result.current.favorites).toEqual([]);

      expect(mockToast).toHaveBeenCalledWith({
        description: expect.any(Object),
        variant: "default",
      });

      expect(localStorage.getItem("favoriteFighters")).toBeNull();
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
