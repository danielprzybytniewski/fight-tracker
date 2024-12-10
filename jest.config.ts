import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

// Jest Configuration
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/public/**",
    "!jest.config.ts",
    "!**/next-env.d.ts",
    "!**/next.config.ts",
    "!**/tailwind.config.ts",
    "!jest.config.ts",
    "!**/src/types/**",
    "!**/src/lib/**",
    "!**/src/components/ui/**",
    "!**/src/providers/**",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/* to src/*
  },
};

export default createJestConfig(config);
