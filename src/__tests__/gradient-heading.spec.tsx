import { render, screen } from "@testing-library/react";
import GradientHeading from "@/components/shared/gradient-heading";

describe("GradientHeading", () => {
  test("renders with default size and spacing", () => {
    render(<GradientHeading>Default Heading</GradientHeading>);
    const heading = screen.getByText("Default Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-2xl sm:text-4xl pb-3 mb-2");
  });

  test("renders with large size", () => {
    render(<GradientHeading size="large">Large Heading</GradientHeading>);
    const heading = screen.getByText("Large Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-3xl sm:text-4xl");
  });

  test("renders with large spacing", () => {
    render(<GradientHeading spacing="large">Spaced Heading</GradientHeading>);
    const heading = screen.getByText("Spaced Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("pb-3 my-2 sm:my-4");
  });

  test("renders with large size and large spacing", () => {
    render(
      <GradientHeading size="large" spacing="large">
        Large Spaced Heading
      </GradientHeading>,
    );
    const heading = screen.getByText("Large Spaced Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-3xl sm:text-4xl pb-3 my-2 sm:my-4");
  });

  test("renders with custom className", () => {
    render(
      <GradientHeading className="custom-class">
        Custom Class Heading
      </GradientHeading>,
    );
    const heading = screen.getByText("Custom Class Heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("custom-class");
  });

  test("renders with different component", () => {
    render(<GradientHeading component="h2">H2 Heading</GradientHeading>);
    const heading = screen.getByText("H2 Heading");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });
});
