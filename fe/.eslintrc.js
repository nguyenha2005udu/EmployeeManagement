module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    // Tắt một số cảnh báo phổ biến
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "no-console": ["warn", { allow: ["error"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
