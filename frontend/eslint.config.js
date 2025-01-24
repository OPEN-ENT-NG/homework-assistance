import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".eslintrc.cjs",
      "prettier.config.cjs",
      "public/**",
      "scripts/**",
      "vite.config.ts",
      "old/**",
    ],
  },
  // Configuration pour les fichiers de configuration (JS)
  {
    files: ["*.js", "*.cjs", "*.mjs"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2024,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  // Configuration principale pour les fichiers TypeScript/React
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2024,
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        process: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      // ESLint base rules
      "no-undef": "error",
      "no-unused-vars": "off",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-var-requires": "error",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",

      // Import rules
      "import/no-unresolved": "off",
      "import/named": "error",
      "import/default": "off",
      "import/namespace": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
  },
];
