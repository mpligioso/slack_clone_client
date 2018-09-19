module.exports = {
    extends: "airbnb",
    rules: {
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0,
        "react/destructuring-assignment": 0,
    },
    globals: {
        document: 1
    },
    parser: "babel-eslint",
    env: {
        browser: 1
    }
};