import { render, screen } from "@testing-library/react";
import AthleteDetails from "@/components/athlete-details";
import { DetailItem, NOT_AVAILABLE } from "@/types/rankings-schema.types";
import {
  mockAdditionalDetails,
  mockGeneralDetails,
} from "@/__mocks__/mock-data";

jest.mock("@/components/athlete-detail-card", () =>
  jest.fn(({ label, value }: DetailItem) => (
    <div data-testid="athlete-detail-card">
      <h2>{label}</h2>
      <p>{value || NOT_AVAILABLE}</p>
    </div>
  ))
);

describe("AthleteDetails", () => {
  test("renders all general details", () => {
    render(
      <AthleteDetails
        generalDetails={mockGeneralDetails}
        additionalDetails={mockAdditionalDetails}
      />
    );

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
    render(
      <AthleteDetails
        generalDetails={mockGeneralDetails}
        additionalDetails={mockAdditionalDetails}
      />
    );

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

    render(
      <AthleteDetails
        generalDetails={mockGeneralDetails}
        additionalDetails={mockAdditionalDetails}
      />
    );

    expect(screen.getAllByTestId("athlete-detail-card").length).toBe(
      totalDetails
    );
  });
});
