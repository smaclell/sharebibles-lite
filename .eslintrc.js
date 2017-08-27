module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    "global-require": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": ["error", { forbid: ["any", "array"] }],
  },
};
