const path = require('path');
const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isEnvProduction = (process.env.NODE_ENV === 'production');
const srcPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'build');

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  bail: isEnvProduction,

  entry: path.resolve(srcPath, 'index.js'),

  output: {
    path: outputPath,
    filename: 'touchegg-gui.js',

    // Add /* filename */ comments to generated require()s in the output
    pathinfo: !isEnvProduction,
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.mjs'],
  },

  optimization: {
    minimize: isEnvProduction,
  },

  plugins: [
    // Environment variables
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isEnvProduction ? 'production' : 'development'),
    }),

    // Generates an HTML report with the size of each dependency
    isEnvProduction && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'bundle_analysis', 'size-report-client.html'),
      openAnalyzer: false,
      generateStatsFile: false,
    }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        oneOf: [
          // Process application JS with Babel
          {
            test: /\.(js|mjs)$/,
            include: path.resolve(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
              // See Babel options in `babel.config.js`

              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction,
            },
          },

          // Process any JS outside of the app with Babel
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              sourceMaps: false,
            },
          },

          // Load everything else with file-loader
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
