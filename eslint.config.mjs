import globals from 'globals';
import tseslint from 'typescript-eslint';

import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  { languageOptions: { globals: globals.browser } },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
    },
  },

  eslintConfigPrettier,
];
