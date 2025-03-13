import normalizeName from "@/lib/normalize-name";

describe("normalizeName", () => {
  test("removes diacritics correctly", () => {
    const input = "Jiří Procházka";
    const expectedOutput = "Jiri Prochazka";

    const result = normalizeName(input);

    expect(result).toEqual(expectedOutput);
  });

  test("handles names with multiple diacritics and special characters", () => {
    const input = "Réneé O'Conner-Sánchez";
    const expectedOutput = "Renee O'Conner-Sanchez";

    const result = normalizeName(input);

    expect(result).toEqual(expectedOutput);
  });

  test("handles names with polish chars", () => {
    const input = "Jan Błachowicz";
    const expectedOutput = "Jan Blachowicz";

    const result = normalizeName(input);

    expect(result).toEqual(expectedOutput);
  });

  test("trims leading and trailing spaces", () => {
    const input = "  Brandon Moreno  ";
    const expectedOutput = "Brandon Moreno";

    const result = normalizeName(input);

    expect(result).toEqual(expectedOutput);
  });
});
