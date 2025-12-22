const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// --- SVG Support ---
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// --- NativeWind ---
module.exports = withNativeWind(config, {
  input: './global.css',
  configPath: './tailwind.config.js',
  inlineRem: 14,
});
