module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: "REACT_APP_GOOGLE_API_KEY",
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};


