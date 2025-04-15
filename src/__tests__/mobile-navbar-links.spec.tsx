import MobileNavbarLinks from "@/components/navbar/mobile-navbar-links";
import { useActiveLink } from "@/hooks/use-active-link";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/use-active-link", () => ({
  useActiveLink: jest.fn(),
}));

describe("MobileNavbarLinks", () => {
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const onItemClick = jest.fn();
  const href = "/rankings";
  const label = "UFC Rankings";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActiveLink.mockReturnValue(false);
    render(
      <MobileNavbarLinks href={href} label={label} onItemClick={onItemClick} />
    );
  });

  test("renders link with correct href and label", () => {
    const link = screen.getByRole("link", { name: label });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
  });

  test("applies active state classes when link is active", () => {
    mockUseActiveLink.mockReturnValue(true);
    render(
      <MobileNavbarLinks href={href} label={label} onItemClick={onItemClick} />
    );

    const links = screen.getAllByRole("link", { name: label });
    expect(links[1]).toHaveClass("font-bold");
  });

  test("does not apply active state classes when link is inactive", () => {
    const link = screen.getByRole("link", { name: label });
    expect(link).not.toHaveClass("font-bold");
  });

  test("calls onItemClick props when clicking on the link", async () => {
    const link = screen.getByRole("link", { name: label });

    link.click();
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
