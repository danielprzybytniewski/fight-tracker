import generatePageNumbers from "@/lib/generate-page-numbers";

describe("generatePageNumbers", () => {
  test("returns correct pages for mobile view when currentPage is in the middle", () => {
    const result = generatePageNumbers({
      currentPage: 3,
      totalPages: 5,
      isMobile: true,
    });
    expect(result).toEqual([2, 3, 4]);
  });

  test("returns correct pages for mobile view when currentPage is the first page", () => {
    const result = generatePageNumbers({
      currentPage: 1,
      totalPages: 5,
      isMobile: true,
    });
    expect(result).toEqual([1, 2]);
  });

  test("returns correct pages for mobile view when currentPage is the last page", () => {
    const result = generatePageNumbers({
      currentPage: 5,
      totalPages: 5,
      isMobile: true,
    });
    expect(result).toEqual([4, 5]);
  });

  test("returns correct pages for desktop view when currentPage is in the middle", () => {
    const result = generatePageNumbers({
      currentPage: 3,
      totalPages: 5,
      isMobile: false,
    });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("returns correct pages for desktop view when currentPage is the first page", () => {
    const result = generatePageNumbers({
      currentPage: 1,
      totalPages: 5,
      isMobile: false,
    });
    expect(result).toEqual([1, 2, 5]);
  });

  test("returns correct pages for desktop view when currentPage is the last page", () => {
    const result = generatePageNumbers({
      currentPage: 5,
      totalPages: 5,
      isMobile: false,
    });
    expect(result).toEqual([1, 4, 5]);
  });

  test("returns correct pages for single page total", () => {
    const result = generatePageNumbers({
      currentPage: 1,
      totalPages: 1,
      isMobile: false,
    });
    expect(result).toEqual([1]);
  });
});
