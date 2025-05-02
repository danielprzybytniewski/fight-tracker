import removeDivisionSuffix from "@/lib/remove-division-suffix";

describe("removeDivisionSuffix", () => {
  test('removes the "Division" suffix at the end of the string', () => {
    expect(removeDivisionSuffix("Light Heavyweight Division")).toBe(
      "Light Heavyweight",
    );
  });

  test('removes the "Division" suffix at the end, even with leading spaces', () => {
    expect(removeDivisionSuffix("Middleweight  Division")).toBe("Middleweight");
  });

  test('removes the "Division" suffix regardless of case', () => {
    expect(removeDivisionSuffix("Welterweight division")).toBe("Welterweight");
    expect(removeDivisionSuffix("Bantamweight DIVISION")).toBe("Bantamweight");
  });

  test('returns the original string if no "Division" suffix is present', () => {
    expect(removeDivisionSuffix("Featherweight")).toBe("Featherweight");
  });

  test('returns an empty string if the input is only "Division"', () => {
    expect(removeDivisionSuffix("Division")).toBe("");
  });

  test("returns an empty string when input is empty", () => {
    expect(removeDivisionSuffix("")).toBe("");
  });
});
