module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: [
      '/node_modules/',
      '/build/',
    ],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };
  