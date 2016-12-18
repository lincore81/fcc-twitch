module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": [
            "warn", 
            {"args": "all"}
        ],
        "eqeqeq": [
            "error",
            "always"
        ],
        "strict": [
            "error",
            "safe"
        ],
        "react/jsx-uses-vars": [2],
        "no-console": 0,
        "no-else-return": 2,
        "no-loop-func": 2,
        "no-var": 2,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "backtick"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
