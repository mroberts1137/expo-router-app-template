const config = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // Projects configuration for different environments
  projects: [
    // Node environment for .js and .ts
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/?(*.)+(spec|test).[jt]s'],
      transform: {
        '^.+\\.(ts|js)$': 'babel-jest'
      }
    },
    // jsdom environment for .jsx and .tsx
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: ['**/?(*.)+(spec|test).[jt]sx'],
      transform: {
        '^.+\\.(tsx|jsx)$': 'babel-jest'
      }
    }
  ],

  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui|react-redux|redux)'
  ],

  // Setup and teardown
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  globalTeardown: '<rootDir>/jest.teardown.js',

  // Module configuration
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Exclude from testing
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.expo/', '/coverage/'],

  // Coverage configuration
  collectCoverage: false, // run jest --coverage to collect coverage
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/.expo/',
    '/coverage/',
    '/jest.setup.js',
    '/jest.config.js',
    '/__tests__/',
    '/__mocks__/'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};

module.exports = config;
