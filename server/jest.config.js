/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*test.ts"],
  verbose: true,
  forceExit: true,
  modulePaths: ["./src"],
  setupFilesAfterEnv: ["<rootDir>/src/lib/prisma/singleton.ts"],
  // clearMocks: true,
};
