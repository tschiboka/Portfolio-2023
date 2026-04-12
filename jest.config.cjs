module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/common'],
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/common/$1',
        '\\.s?css$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/file-mock.js',
        '\\.pdf$': '<rootDir>/file-mock.js',
        '\\.png$': '<rootDir>/file-mock.js',
        '\\.jpe?g$': '<rootDir>/file-mock.js',
    },
    setupFilesAfterEnv: [
        //"@testing-library/react/cleanup-after-each",
        //"@testing-library/jest-dom/extend-expect",
        '<rootDir>/src/setupTests.ts',
    ],
}
