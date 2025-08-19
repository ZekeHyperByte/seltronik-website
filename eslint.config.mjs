import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = [
  {
    files: ["**/*.js", "**/*.mjs", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export default eslintConfig;
