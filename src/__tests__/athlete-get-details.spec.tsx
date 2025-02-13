import { mockAthlete, mockIncompleteAthleteData } from "@/__mocks__/mock-data";
import {
  getAdditionalDetails,
  getGeneralDetails,
} from "@/lib/athlete-get-details";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

jest.mock("@/lib/unit-conversion", () => ({
  inchesToCm: jest.fn((inches) => `${inches * 2.54} cm`),
  poundsToKg: jest.fn((pounds) => `${pounds * 0.453592} kg`),
}));

describe("getGeneralDetails", () => {
  test("returns correct details", () => {
    const details = getGeneralDetails(mockAthlete);

    expect(details).toHaveLength(8);
    expect(details).toEqual(
      expect.arrayContaining([
        { label: "Record", value: "20-5-1" },
        { label: "Division", value: "Lightweight" },
        { label: "Height", value: "70 in (177.8 cm)" },
        { label: "Weight", value: "155 lbs (70.30676 kg)" },
      ])
    );
  });

  test("handles edge cases", () => {
    const details = getGeneralDetails(mockIncompleteAthleteData);

    expect(details).toContainEqual({ label: "Record", value: "10-2" });

    const expectedLabels = [
      "Division",
      "Status",
      "Age",
      "Height",
      "Weight",
      "Reach",
      "Leg Reach",
    ];
    expectedLabels.forEach((label) => {
      expect(details).toContainEqual({ label, value: NOT_AVAILABLE });
    });
  });
});

describe("getAdditionalDetails", () => {
  test("returns correct details", () => {
    const details = getAdditionalDetails(mockAthlete);

    expect(details).toHaveLength(4);
    expect(details).toEqual([
      { label: "Fighting Style", value: "Striker" },
      { label: "Trains At", value: "AKA" },
      { label: "Place of Birth", value: "California, USA" },
      { label: "Octagon Debut", value: "2015-01-01" },
    ]);
  });

  test("handles edge cases", () => {
    const details = getAdditionalDetails(mockIncompleteAthleteData);

    const expectedLabels = [
      "Fighting Style",
      "Trains At",
      "Place of Birth",
      "Octagon Debut",
    ];

    expectedLabels.forEach((label) => {
      expect(details).toContainEqual({ label, value: NOT_AVAILABLE });
    });
  });
});
