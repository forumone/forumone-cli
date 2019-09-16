module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "oclif",
        "implicit-dependencies",
    ],
    "extends": [
        "plugin:oclif/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "overrides": {
                    "constructors": "off"
                }
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/member-naming": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-param-reassign": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/triple-slash-reference": ["error", {
          "path": "never",
          "types": "never",
          "lib": "never"
        }],
        "arrow-body-style": "error",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "capitalized-comments": "off",
        "complexity": "off",
        "default-case": "off",
        "implicit-dependencies/no-implicit": ["error", { optional: true }],
        "max-classes-per-file": "off",
        "no-bitwise": "error",
        "no-cond-assign": "off",
        "no-console": "error",
        "no-empty-functions": "off",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "off",
        "no-restricted-syntax": "off",
        "object-shorthand": "error",
        "oclif/command-class-variables": "off",
        "one-var": "error",
        "prefer-const": "error",
        "prefer-template": "off",
        "valid-typeof": "off"
    }
};
