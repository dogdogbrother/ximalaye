module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/component': './src/component',
          '@/config': './src/config',
          '@/assets': './src/assets',
          '@/models': './src/models',
          '@/navigator': './src/navigator',
        },
      },
    ],
  ],
};
