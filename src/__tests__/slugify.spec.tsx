import { slugify } from "@/lib/slugify";

describe("slugify", () => {
  test("converts a string to lowercase and replaces spaces with hyphens", () => {
    const result = slugify("Hello World");

    expect(result).toBe("hello-world");
  });

  test("handles empty strings", () => {
    const result = slugify("");

    expect(result).toBe("");
  });

  test("handles strings with special characters", () => {
    const result = slugify("Hello! @World 2023");

    expect(result).toBe("hello-world-2023");
  });

  test("keeps hyphens in the original string", () => {
    const result = slugify("Hello-World");

    expect(result).toBe("hello-world");
  });
});
