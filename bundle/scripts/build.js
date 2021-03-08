/*
 * Copyright 2020 - 2021 José Expósito <jose.exposito89@gmail.com>
 *
 * This file is part of Touché.
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
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const getWebpackConfig = require('../webpack.config');

const rootPath = process.argv[2];
const outputPath = process.argv[3];
const buildType = process.argv[4];
const projectName = process.argv[5];
const flatpak = (process.argv[6] === 'true');
const targetDE = process.argv[7];
const systemConfigFilePath = process.argv[8];
const env = (buildType === 'release') ? 'production' : 'development';

// TODO: Using 'production' fails because of xml-js, use libxml2
// process.env.NODE_ENV = env;
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = env;
process.env.FLATPAK = flatpak;

const webpackConfig = getWebpackConfig({
  rootPath,
  outputPath,
  projectName,
  flatpak,
  targetDE,
  systemConfigFilePath,
});
const compiler = webpack(webpackConfig);
compiler.run();
