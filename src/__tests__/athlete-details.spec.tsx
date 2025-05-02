import { render, screen } from "@testing-library/react";
import {
  mockAdditionalDetails,
  mockGeneralDetails,
} from "@/__mocks__/mock-data";
import AthleteDetails from "@/components/athlete/athlete-details";
import type { DetailItem } from "@/types/rankings-schema.types";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

jest.mock("@/components/athlete/athlete-detail-card", () =>
  jest.fn(({ label, value }: DetailItem) => (
    <div data-testid="athlete-detail-card">
      <h2>{label}</h2>
      <p>{value || NOT_AVAILABLE}</p>
    </div>
  )),
);

describe("AthleteDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <AthleteDetails
        generalDetails={mockGeneralDetails}
        additionalDetails={mockAdditionalDetails}
      />,
    );
  });

  test("renders all general details", () => {
    mockGeneralDetails.forEach(({ label, value }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      if (value) {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        expect(screen.getByText(NOT_AVAILABLE)).toBeInTheDocument();
      }
    });
  });

  test("renders all additional details", () => {
    mockAdditionalDetails.forEach(({ label, value }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      if (value) {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        expect(screen.getByText(NOT_AVAILABLE)).toBeInTheDocument();
      }
    });
  });

  test("renders the correct number of AthleteDetailCard components", () => {
    const totalDetails =
      mockGeneralDetails.length + mockAdditionalDetails.length;

    expect(screen.getAllByTestId("athlete-detail-card").length).toBe(
      totalDetails,
    );
  });
});
