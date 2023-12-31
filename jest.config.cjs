module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
  
    roots: ["<rootDir>/src"],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
  
    transform: {"^.+\\.tsx?$": "ts-jest"},
    testEnvironment: "jsdom",
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
  
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    // Module file extensions for importing
  
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
      '\\.scss$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/file-mock.js',
      '\\.pdf$': '<rootDir>/file-mock.js',
      '\\.png$': '<rootDir>/file-mock.js',
      '\\.jpg$': '<rootDir>/file-mock.js',
    },
    setupFilesAfterEnv: [
      //"@testing-library/react/cleanup-after-each",
      //"@testing-library/jest-dom/extend-expect",
      "<rootDir>/src/setupTests.ts"
    ],
  };