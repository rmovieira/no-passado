module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    ['@babel/preset-env',
      { targets: { node: 'current' } }
    ]
  ],
};
