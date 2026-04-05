import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** ESLint flat config for the Next.js app (paths relative to Frontend/). */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "prefer-const": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.js",
    "scripts/**",
    "src/components/features/marketplace/MarketplaceClient.tsx",
  ]),
]);

export default eslintConfig;
