module.exports = {
  rules: {
    "no-restricted-imports": ["error", {
      "patterns": [
        {
          "group": [
            "@packages/core/src/domain/*",
            "@packages/core/src/adapters/*",
            "@packages/core/src/infra/*"
          ],
          "message": "UI prohibited from importing Domain/Adapters/Infra directly. Use Application Layer or Ports.",
          "allowTypeImports": true
        }
      ]
    }]
  }
};
