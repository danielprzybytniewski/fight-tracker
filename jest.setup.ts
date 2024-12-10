import "@testing-library/jest-dom";

// Mock matchMedia for tests that depend on it
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// Mock IntersectionObserver globally
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Mock ResizeObserver globally
global.ResizeObserver = class ResizeObserver {
  // Mocking required properties and methods
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
