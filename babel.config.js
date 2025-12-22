// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
//     plugins: ['react-native-worklets/plugin'],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel', // <-- MOVED here
    ],
    plugins: [
      'react-native-worklets/plugin', // Worklets support (remains in plugins)
    ],
  };
};
