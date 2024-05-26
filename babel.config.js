module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    // Make sure to list "react-native-reanimated/plugin" last
    plugins: ["react-native-reanimated/plugin"],
  };
};
