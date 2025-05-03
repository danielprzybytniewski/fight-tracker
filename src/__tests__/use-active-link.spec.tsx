import { usePathname } from "next/navigation";
import { renderHook } from "@testing-library/react";
import { useActiveLink } from "@/hooks/use-active-link";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useActiveLink", () => {
  const mockUsePathname = usePathname as jest.Mock;

  const setup = (pathname: string, href: string) => {
    mockUsePathname.mockReturnValue(pathname);
    return renderHook(() => useActiveLink(href));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("marks link as active when pathname matches href exactly", () => {
    const { result } = setup("/rankings", "/rankings");

    expect(result.current).toBe(true);
  });

  test("marks link as active for nested route", () => {
    const { result } = setup("/rankings/flyweight", "/rankings");

    expect(result.current).toBe(true);
  });

  test("marks link as inactive when pathname does not match href", () => {
    const { result } = setup("/rankings", "/fighters");

    expect(result.current).toBe(false);
  });
});
