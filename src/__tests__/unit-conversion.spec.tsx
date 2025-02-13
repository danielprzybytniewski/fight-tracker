import { inchesToCm, poundsToKg } from "@/lib/unit-conversion";
import { NOT_AVAILABLE } from "@/types/rankings-schema.types";

describe("inchesToCm", () => {
  test("converts inches to centimeters correctly", () => {
    expect(inchesToCm(10)).toBe("25.4 cm");
    expect(inchesToCm(5.5)).toBe("14.0 cm");
    expect(inchesToCm(0)).toBe("0.0 cm");
  });

  test('returns "N/A" for non-numeric input', () => {
    expect(inchesToCm(NaN)).toBe(NOT_AVAILABLE);
  });
});

describe("poundsToKg", () => {
  test("converts pounds to kilograms correctly", () => {
    expect(poundsToKg(100)).toBe("45.4 kg");
    expect(poundsToKg(50.5)).toBe("22.9 kg");
    expect(poundsToKg(0)).toBe("0.0 kg");
  });

  test('returns "N/A" for non-numeric input', () => {
    expect(poundsToKg(NaN)).toBe(NOT_AVAILABLE);
  });
});
