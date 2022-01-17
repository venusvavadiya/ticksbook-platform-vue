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
    'linebreak-style': 'off',
    'max-len': 'off',
  },
};
