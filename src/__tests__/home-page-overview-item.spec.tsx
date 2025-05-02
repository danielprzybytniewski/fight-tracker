import { render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import HomePageOverviewItem from "@/components/home-page/home-page-overview-item";

jest.mock("lucide-react", () => ({
  User: jest.fn(() => <svg data-testid="user-icon" />),
}));

describe("HomePageOverviewItem", () => {
  test("renders the list item with icon and text", () => {
    render(
      <HomePageOverviewItem
        icon={User}
        text="Browse over 170 best UFC fighters"
      />,
    );
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();

    const icon = screen.getByTestId("user-icon");
    expect(icon).toBeInTheDocument();

    const text = screen.getByText("Browse over 170 best UFC fighters");
    expect(text).toBeInTheDocument();
  });
});
