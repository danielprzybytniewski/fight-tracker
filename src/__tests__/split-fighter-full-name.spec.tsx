import { splitFighterFullName } from "@/lib/split-fighter-full-name";

describe("splitFighterFullName", () => {
  test("splits a full name into first and last name", () => {
    const result = splitFighterFullName("John Doe");

    expect(result).toEqual({
      firstName: "John",
      lastName: "Doe",
    });
  });

  test("handles full name with a middle name", () => {
    const result = splitFighterFullName("John Michael Doe");

    expect(result).toEqual({
      firstName: "John",
      lastName: "Michael Doe",
    });
  });

  test("handles a single name correctly", () => {
    const result = splitFighterFullName("John");

    expect(result).toEqual({
      firstName: "John",
      lastName: "",
    });
  });

  test("handles an empty string", () => {
    const result = splitFighterFullName("");

    expect(result).toEqual({
      firstName: "",
      lastName: "",
    });
  });

  test("handles names with special characters", () => {
    const result = splitFighterFullName("John O'Connor");

    expect(result).toEqual({
      firstName: "John",
      lastName: "O'Connor",
    });
  });
});
