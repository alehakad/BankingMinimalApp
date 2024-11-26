export default {
    // The default test timeout in milliseconds (e.g., 5000ms or 5 seconds)
    testTimeout: 10000,

    // Specifies the environment for the tests (defaults to jsdom for frontend testing)
    testEnvironment: 'node',

    // Automatically clear mock calls, instances, contexts, and results before every test
    clearMocks: true,

    // Enable the detectOpenHandles option
    detectOpenHandles: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to handle test suites that require async testing
    setupFilesAfterEnv: [
        '<rootDir>/tests/common/setupTests.js', // Path to your global setup file
    ],

    collectCoverage: true,                // Enable code coverage collection
    // Configure test coverage collection
    collectCoverageFrom: [
        '**/src/**/*.{js,jsx}',   // Collect coverage for all JavaScript files in src
        '!**/node_modules/**',    // Exclude node_modules from coverage
    ],

    coverageReporters: ["text",],  // Report formats: text (console output), lcov (HTML reports)

    // Add any other Jest configurations you may need
    verbose: true,  // Show individual test results in the console

    transform: {}
};
