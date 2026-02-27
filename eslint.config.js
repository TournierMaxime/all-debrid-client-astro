import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: ["dist", "node_modules", ".astro"],
  },

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Trie et fusionne les imports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React / Packages externes
            ["^react", "^@?\\w"],
            // Alias interne
            ["^@/"],
            // Parents
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Fichiers relatifs
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // CSS / Side effect imports
            ["^.+\\.?(css|scss|sass)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Optionnel mais utile pour TS
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]
