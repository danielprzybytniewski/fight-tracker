import { render, screen } from "@testing-library/react";
import NavbarLinks from "@/components/navbar/navbar-links";
import { useActiveLink } from "@/hooks/use-active-link";

jest.mock("@/hooks/use-active-link", () => ({
  useActiveLink: jest.fn(),
}));

describe("NavbarLinks", () => {
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const href = "/rankings";
  const label = "UFC Rankings";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActiveLink.mockReturnValue(false);
    render(<NavbarLinks href={href} label={label} />);
  });

  test("renders link with correct href and label", () => {
    const link = screen.getByRole("link", { name: label });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
  });

  test("applies active classes when link is active", () => {
    mockUseActiveLink.mockReturnValue(true);
    render(<NavbarLinks href={href} label={label} />);

    const links = screen.getAllByRole("link", { name: label });
    expect(links[1]).toHaveClass("font-bold");
  });

  test("does not apply active classes when link is inactive", () => {
    const link = screen.getByRole("link", { name: label });
    expect(link).not.toHaveClass("font-bold");
  });
});
