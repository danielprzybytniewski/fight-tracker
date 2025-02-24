import AthleteDetailCard from "@/components/athlete/athlete-detail-card";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";
import { render, screen } from "@testing-library/react";

describe("AthleteDetailCard", () => {
  test("renders the label and value correctly", () => {
    render(<AthleteDetailCard label="Age" value="30" />);
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("renders 'N/A' when the value is undefined", () => {
    render(<AthleteDetailCard label="Age" value={undefined} />);
    expect(screen.getByText(NOT_AVAILABLE)).toBeInTheDocument();
  });
});
