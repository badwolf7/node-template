/**
 * ESLint rules by which to lint the JavaScript files.
 * http://eslint.org/docs/rules/
 */

module.exports = {
    "extends": [
        "eslint:recommended",
        "airbnb"
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "globals": {
        "app": true,
        "hotlinks": true,
        "describe": true,
        "it": true,
        "after": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "impliedStrict": true
        }
    },
    "rules": {
        // Possible Errors
        "no-console": "off",
        "valid-jsdoc": "error",

        // Best Practices
        "default-case": "off",
        "no-empty-function": "error",
        "no-param-reassign": "warn",
        "vars-on-top": "warn",

        // Strict Mode
        "strict": "error",

        // Variables
        "no-use-before-define": "error",

        // Node.js and CommonJS
        "global-require": "error",
        "handle-callback-err": "warn",

        // Stylistic Issues
        "comma-dangle": "error",
        "eol-last": "off",
        "func-names": "off",
        "indent": ["error", 2],
        "max-depth": ["error", 6],
        "max-len": ["warn", 120],
        "max-len": ["error", 140],
        "newline-before-return": "error",
        "no-plusplus": "off",

        // ECMAScript 6
        "arrow-body-style": ["error", "always"],
        "arrow-parens": ["error", "always"],
        "arrow-spacing": "error",
        "no-duplicate-imports": "error",
        "no-useless-constructor": "error",
        "object-shorthand": ["warn", "never"]
    }
};