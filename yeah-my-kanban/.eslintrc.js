module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['evt'] }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'no-console': ['off'],
    'react/no-unknown-property': ['error', { ignore: ['css', 'test', 'expect'] }],
    'linebreak-style': ['off'],
    'react/jsx-no-bind': ['error', { allowBind: true, allowArrowFunctions: true }],
    'max-len': ['off'],
    'no-unused-vars': ['off'],
    'no-use-before-define': ['error', {
      functions: false,
    }],
    'react/destructuring-assignment': ['off'],
    'jsx-no-constructed-context-values': ['off'],
    'import/no-extraneous-dependencies': ['off'],
  },
};
