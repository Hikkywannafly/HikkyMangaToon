// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       "module-resolver",
//       "react-native-reanimated/plugin",
//     ],
//     "extensions": [
//       ".js",
//       ".jsx",
//       ".ts",
//       ".tsx",
//     ],
//     "alias": {
//       "@/screens": "./src/screens",
//     }

//   };
// };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
  ],
};