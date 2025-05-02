import { render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import FightsHistoryDetails from "@/components/fights-history/fights-history-details";

jest.mock("lucide-react", () => ({
  User: jest.fn(() => <svg data-testid="user-icon" />),
}));

describe("FightsHistoryDetails", () => {
  test("renders correctly with given props", () => {
    render(
      <FightsHistoryDetails icon={User} label="Fighter" value="John Doe" />,
    );

    expect(screen.getByText("Fighter:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    const iconElement = screen.getByTestId("user-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
