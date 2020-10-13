/*
 * Copyright 2020 José Expósito <jose.exposito89@gmail.com>
 *
 * This file is part of Touchégg-GUI.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation,  either version 3 of the License,  or (at your option)  any later
 * version.
 *
 * This program is distributed in the hope that it will be useful,  but  WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the  GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */
const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const EntryTemplateWebpackPlugin = require('./webpack-plugins/entry-template-webpack-plugin');
const CompileGResourceWebpackPlugin = require('./webpack-plugins/compile-gresource-webpack-plugin');
const buildTemplate = require('./build-template');
const info = require('./info');

const isEnvProduction = (process.env.NODE_ENV === 'production');
// TODO Allow to configure this prefix
const prefix = isEnvProduction ? '/usr' : info.buildInstallPath;

// CopyPlugin transform function
const transform = (contentBuffer) => {
  const content = buildTemplate(contentBuffer.toString());
  return Buffer.from(content, 'utf-8');
};

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  bail: isEnvProduction,

  // Use the entry template as entry, see EntryTemplateWebpackPlugin
  entry: path.resolve(info.buildBundlePath, info.entryTemplateName),

  output: {
    path: info.buildBundlePath,
    filename: `${info.package.name}.js`,

    // Add /* filename */ comments to generated require()s in the output
    pathinfo: !isEnvProduction,
  },

  resolve: {
    alias: {
      '~': info.srcPath,
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

    new CopyPlugin({
      patterns: [
        // Copy the po files before compile them to mo
        // {
        //   from: 'po/*.po',
        //   to: `${outputPath}/share/locale`,
        //   transformPath(fromPath, foo) {
        //     // return `${outputPath}/share/locale/`;

        //     const locale = path.parse(fromPath).name;
        //     const destPath = `${outputPath}/share/locale/${locale}/LC_MESSAGES/${packageName}.po`;
        //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        //     console.log(fromPath);
        //     console.log(foo);
        //     console.log(destPath);
        //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

        //     return destPath;
        //   },
        // },

        {
          from: path.resolve(info.dataPath, `${info.package.name}.appdata.xml`),
          to: path.resolve(info.buildInstallPath, 'share', 'appdata'),
          transform,
        },

        {
          from: path.resolve(info.dataPath, `${info.package.name}.desktop`),
          to: path.resolve(info.buildInstallPath, 'share', 'applications'),
          transform,
        },

        {
          from: path.resolve(info.templatesPath, info.entryBinTemplateName),
          to: path.resolve(info.buildInstallPath, 'bin', info.package.name),
          transform,
        },
      ],
    }),

    // Copy the entry template to use it as entry point
    new EntryTemplateWebpackPlugin({
      templatePath: path.resolve(info.templatesPath, info.entryTemplateName),
      outputPath: info.buildBundlePath,
      outputFilename: `${info.entryTemplateName}.js`,
    }),

    // Compile the output bundle to a gresource
    new CompileGResourceWebpackPlugin({
      templatePath: path.resolve(info.templatesPath, info.srcGResourceTemplateName),
      buildDirectory: info.buildBundlePath,
      outputPath: `${info.buildInstallPath}/share/${info.package.shortName}`,
      outputFilename: `${info.package.name}.src.gresource`,
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
