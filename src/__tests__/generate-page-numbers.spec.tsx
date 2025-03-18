import generatePageNumbers from "@/lib/generate-page-numbers";

describe("generatePageNumbers", () => {
  const testCases = [
    {
      name: "mobile view, currentPage in the middle",
      options: { currentPage: 3, totalPages: 5, isMobile: true },
      expected: [2, 3, 4],
    },
    {
      name: "mobile view, currentPage is the first page",
      options: { currentPage: 1, totalPages: 5, isMobile: true },
      expected: [1, 2],
    },
    {
      name: "mobile view, currentPage is the last page",
      options: { currentPage: 5, totalPages: 5, isMobile: true },
      expected: [4, 5],
    },
    {
      name: "desktop view, currentPage in the middle",
      options: { currentPage: 3, totalPages: 5, isMobile: false },
      expected: [1, 2, 3, 4, 5],
    },
    {
      name: "desktop view, currentPage is the first page",
      options: { currentPage: 1, totalPages: 5, isMobile: false },
      expected: [1, 2, 5],
    },
    {
      name: "desktop view, currentPage is the last page",
      options: { currentPage: 5, totalPages: 5, isMobile: false },
      expected: [1, 4, 5],
    },
    {
      name: "single page total",
      options: { currentPage: 1, totalPages: 1, isMobile: false },
      expected: [1],
    },
  ];

  testCases.forEach((testCase) => {
    test(testCase.name, () => {
      const result = generatePageNumbers(testCase.options);
      expect(result).toEqual(testCase.expected);
    });
  });
});
