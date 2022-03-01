module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: [
    'src/components/*.{js,vue}',
    'src/*.{js,vue}'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'vue'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '<rootDir>/src/plugins/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
  // verbose: false,
}
