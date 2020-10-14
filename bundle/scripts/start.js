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
/* eslint-disable import/no-extraneous-dependencies */
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const { exec } = require('child_process');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const info = require('../info');

const compiler = webpack(webpackConfig);
compiler.run((err) => {
  if (!err) {
    const childProcess = exec(`gjs ${info.buildInstallPath}/bin/${info.package.name} ${process.argv.slice(2)}`, { cwd: info.rootPath });

    childProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  } else {
    console.error(err);
  }
});
