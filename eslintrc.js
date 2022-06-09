const baseConfig = require('ts-standard/eslintrc')
const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
}

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    '@typescript-eslint/no-floating-promises': RULES.OFF,
    '@typescript-eslint/strict-boolean-expressions': RULES.OFF
  }
}
