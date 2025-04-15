import { useActiveLink } from "@/hooks/use-active-link";
import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";

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

  test("returns true when pathname matches href exactly", () => {
    const { result } = setup("/rankings", "/rankings");

    expect(result.current).toBe(true);
  });

  test("returns true when pathname starts with href followed by a slash", () => {
    const { result } = setup("/rankings/flyweight", "/rankings/flyweight");

    expect(result.current).toBe(true);
  });

  test("returns false when pathname does not match href", () => {
    const { result } = setup("/rankings", "/fighters");

    expect(result.current).toBe(false);
  });
});
