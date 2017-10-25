module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    "no-case-declarations": "off",
    "global-require": "off",
    "class-methods-use-this": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": ["error", { forbid: ["any"] }],
  },
};
