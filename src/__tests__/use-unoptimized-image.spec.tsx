import { useUnoptimizedImage } from "@/hooks/use-unoptimized-image";
import { renderHook, waitFor } from "@testing-library/react";

describe("useUnoptimizedImage", () => {
  test("initializes with unoptimized set to false", () => {
    const { result } = renderHook(() => useUnoptimizedImage());

    expect(result.current.unoptimized).toBe(false);
  });

  test("sets unoptimized to true when handleImageLoadError is called", async () => {
    const { result } = renderHook(() => useUnoptimizedImage());

    await waitFor(() => {
      result.current.handleImageLoadError();
      expect(result.current.unoptimized).toBe(true);
    });
  });
});
