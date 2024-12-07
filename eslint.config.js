module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // Add your custom rules here, overriding or extending existing ones
    'no-console': 'warn', // Allow console logs for debugging
    'consistent-return': 'off', // Adjust return statement rules as needed
  },
};