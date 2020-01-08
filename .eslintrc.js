module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
    ],
    "rules": {
          // enable additional rules
        "indent": [2, 2, {"SwitchCase": 1}],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-cond-assign": ["error", "always"],
        "comma-style": [2, "last"],
        "no-console": "off",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "no-mixed-spaces-and-tabs": ["error"]
    }
};

