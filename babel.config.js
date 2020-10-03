module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // "usage" imports core-js when needed so we don't need to import anything
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
  ],
};
