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
const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');

const getWebpackConfig = (rootPath, outputPath, projectName) => {
  const isEnvProduction = (process.env.NODE_ENV === 'production');
  const srcPath = path.resolve(rootPath, 'src');
  const packageJsonPath = path.resolve(rootPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  return {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,

    entry: path.resolve(rootPath, packageJson.main),

    output: {
      path: outputPath,
      filename: `${projectName}.js`,

      // Add /* filename */ comments to generated require()s in the output
      pathinfo: !isEnvProduction,
    },

    resolve: {
      alias: {
        '~': srcPath,
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
        'process.env.PROJECT_NAME': JSON.stringify(projectName),
      }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          oneOf: [
            // Process application JS with Babel
            {
              test: /\.(js|mjs)$/,
              include: srcPath,
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                    // Target Firefox with a SpiderMonkey version compatible with GJS
                    // https://gjs.guide/guides/gjs/features-across-versions.html
                    // https://en.wikipedia.org/wiki/SpiderMonkey#Versions
                    // https://github.com/browserslist/browserslist
                      targets: 'firefox >= 52',

                      // "usage" imports core-js when needed so we don't need to import anything
                      useBuiltIns: 'usage',
                      corejs: '3',
                    },
                  ],
                ],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                ],

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
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
  };
};

module.exports = getWebpackConfig;
