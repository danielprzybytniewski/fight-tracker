import { useMediaQuery } from "@/hooks/use-media-query";
import { renderHook, waitFor } from "@testing-library/react";

describe("useMediaQuery", () => {
  const originalMatchMedia = window.matchMedia;
  let matchMediaMock: jest.Mock;
  let matchMediaQuery: {
    matches: boolean;
    media: string;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
  };

  beforeAll(() => {
    matchMediaMock = jest.fn();
    window.matchMedia = matchMediaMock;
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    matchMediaQuery = {
      matches: false,
      media: "(min-width: 640px)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    matchMediaMock.mockReturnValue(matchMediaQuery);
  });

  const renderMediaQueryHook = (query: string = "(min-width: 640px)") =>
    renderHook(() => useMediaQuery(query));

  const expectMediaQueryResult = async (expected: boolean) => {
    const { result } = renderMediaQueryHook();
    await waitFor(() => {
      expect(result.current).toBe(expected);
    });
  };

  test("returns false when window.matchMedia does not match", async () => {
    await expectMediaQueryResult(false);
  });

  test("returns true when window.matchMedia matches", async () => {
    matchMediaQuery.matches = true;
    await expectMediaQueryResult(true);
  });

  test("updates matches when media query changes", async () => {
    const { result } = renderMediaQueryHook();

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
