module.exports = {
  root: true,
  extends: ['erb'],
  plugins: ['@typescript-eslint'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react-hooks/exhaustive-deps': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/require-extension': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/no-array-index-key': 0,
    'max-len': [2, 255, 2],
    'func-names': 0,
    'prefer-spread': 0,
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    'generator-star-spacing': 0,
    'jsx-quotes': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'prefer-rest-params': 0,
    'import/no-unresolved': 0,
    'consistent-return': 0,
    'comma-dangle': [0, 'never'],
    'new-cap': 0,
    'no-global-assign': 0,
    'no-unsafe-negation': 0,
    'no-unused-expressions': 0,
    'no-useless-constructor': 0,
    'no-else-return': 0,
    semi: [2, 'always'],
    'class-methods-use-this': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    'no-console': 0,
    quotes: 0,
    radix: 0,
    'no-restricted-syntax': 0,
    'default-case': 0,
    'array-callback-return': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-boolean-value': 0,
    'compat/compat': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/default-param-last': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-use-before-define': 0,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};