import { useMediaQuery } from "@/hooks/use-media-query";
import { renderHook, waitFor } from "@testing-library/react";

describe("useMediaQuery", () => {
  const originalMatchMedia = window.matchMedia;
  let matches = false;

  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns false when window.matchMedia does not match", async () => {
    matches = false;
    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  test("returns true when window.matchMedia matches", async () => {
    matches = true;
    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  test("updates matches when media query changes", async () => {
    const matchMediaQuery = {
      matches: false,
      media: "(min-width: 640px)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    window.matchMedia = jest.fn().mockReturnValue(matchMediaQuery);

    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    await waitFor(() => {
      matchMediaQuery.matches = true;
      matchMediaQuery.addEventListener.mock.calls[0][1]();
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
