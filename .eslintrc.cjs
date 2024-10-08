/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  ignorePatterns: [
    '!**/.server',
    '!**/.client',
    '**/.cache/**',
    '**/node_modules/**',
    '**/build/**',
    '**/public/build/**',
    '**/server-build/**',
    '**/dist/**',
  ],

  // Base config
  extends: ['eslint:recommended', 'plugin:unicorn/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    /**
     * @description unicorn rules
     */
    'unicorn/numeric-separators-style': [
      'error',
      { number: { minimumDigits: 0, groupLength: 3 } },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
  },

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
      rules: {
        'react/prop-types': 'off',
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        /**
         * @description @typescript-eslint rules
         */
        '@typescript-eslint/triple-slash-reference': 'off',
        /**
         * @description simple-import-sort rules
         */
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        /**
         * @description import rules
         */
        'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
}
