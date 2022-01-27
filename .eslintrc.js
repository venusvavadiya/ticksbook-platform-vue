module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
  },
  overrides: [{
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  }, {
    files: ['**/*.vue'],
    rules: {
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
    },
  }],
};
