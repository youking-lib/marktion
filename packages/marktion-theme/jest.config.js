module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/*.|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coveragePathIgnorePatterns: ['/example/', '/node_modules/', '/__tests__/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  rootDir: __dirname,
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
}
