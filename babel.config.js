module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: ["REACT_APP_PLACES_API", "REACT_APP_RADIUS", "REACT_APP_TYPE", "REACT_APP_PLACES_API_KEY"],
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};


