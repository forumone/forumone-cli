module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "oclif",
        "prettier",
        "implicit-dependencies",
    ],
    "extends": [
        "xo",
        "xo-typescript",
        "plugin:oclif/recommended",
        "plugin:prettier/recommended"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "overrides": {
                    "constructors": "off"
                }
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/member-naming": "off",
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-param-reassign": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/triple-slash-reference": ["error", {
          "path": "never",
          "types": "never",
          "lib": "never"
        }],
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": "error",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "capitalized-comments": "off",
        "complexity": "off",
        "constructor-super": "error",
        "curly": "off",
        "default-case": "off",
        "dot-notation": "error",
        "eol-last": "off",
        "guard-for-in": "error",
        "implicit-dependencies/no-implicit": ["error", { optional: true }],
        "linebreak-style": "off",
        "max-classes-per-file": "off",
        "new-parens": "off",
        "newline-per-chained-call": "off",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "off",
        "no-console": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-empty": "off",
        "no-empty-functions": "off",
        "no-eval": "error",
        "no-extra-semi": "off",
        "no-fallthrough": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "off",
        "no-multiple-empty-lines": "off",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-regex-spaces": "error",
        "no-restricted-syntax": "off",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "oclif/command-class-variables": "off",
        "one-var": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "off",
        "quote-props": "off",
        "radix": "error",
        "space-before-function-paren": "off",
        "use-isnan": "error",
        "valid-typeof": "off",
        "yoda": "error"
    }
};
