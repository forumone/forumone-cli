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
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "overrides": {
                    "constructors": "off"
                }
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
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
        "implicit-dependencies/no-implicit": ["error", { optional: true }],
        "no-bitwise": "error",
        "no-console": "error",
        "no-restricted-syntax": "off",
        "object-shorthand": "error",
        "oclif/command-class-variables": "off",
        "prefer-const": "error"
    }
};
