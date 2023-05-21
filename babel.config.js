module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: ["REACT_APP_ADDRESS_VALIDATION", "REACT_APP_ADDRESS_VALIDATION_KEY"],
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};


