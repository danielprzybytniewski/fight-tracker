import { render, screen } from "@testing-library/react";
import HomePageFeatureIcon from "@/components/home-page/home-page-feature-icon";

jest.mock("lucide-react", () => ({
  User: jest.fn(() => <svg data-testid="user-icon" />),
  Heart: jest.fn(() => <svg data-testid="heart-icon" />),
}));

describe("HomePageFeatureIcon", () => {
  test("renders example icons correctly", () => {
    render(<HomePageFeatureIcon iconName="User" />);
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();

    render(<HomePageFeatureIcon iconName="Heart" />);
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });
});
