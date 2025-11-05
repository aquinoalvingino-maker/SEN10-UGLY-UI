import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser, // if you have browser code
      },
    },
  },
  {
    files: ["**/*.test.js", "**/tests/**/*.js"],
    plugins: {
      jest: require("eslint-plugin-jest"),
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
    },
  },
];
