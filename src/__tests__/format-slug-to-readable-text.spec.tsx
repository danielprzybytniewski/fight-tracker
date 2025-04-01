import { formatSlugToReadableText } from "@/lib";

describe("formatSlugToReadableText", () => {
  test("handles url slugs", () => {
    const input = "this-is-a-test";
    const expectedOutput = "This Is A Test";

    const result = formatSlugToReadableText(input);

    expect(result).toEqual(expectedOutput);
  });

  test("handles single word slugs", () => {
    const input = "test";
    const expectedOutput = "Test";

    const result = formatSlugToReadableText(input);

    expect(result).toEqual(expectedOutput);
  });

  test("handles slugs with mixed case", () => {
    const input = "ThIs-Is-A-tEsT";
    const expectedOutput = "This Is A Test";

    const result = formatSlugToReadableText(input);

    expect(result).toEqual(expectedOutput);
  });
});
