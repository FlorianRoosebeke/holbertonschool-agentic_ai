import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      ".config/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    rules: {
      // Layout and section components intentionally mirror the React version
      // file for file (Header, Hero, About, Contact...), so single-word names
      // are kept to preserve the 1:1 mapping with the original project.
      "vue/multi-word-component-names": "off",
    },
  },
]);
