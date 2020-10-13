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
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const validateOptions = require('schema-utils');
const buildTemplate = require('../build-template');

/**
 * Webpack plugin to compile gresources.
 */
class CompileGResourceWebpackPlugin {
  constructor(options) {
    const schema = {
      type: 'object',
      additionalProperties: false,
      properties: {
        templatePath: {
          type: 'string',
        },
        buildDirectory: {
          type: 'string',
        },
        outputPath: {
          type: 'string',
        },
        outputFilename: {
          type: 'string',
        },
      },
    };

    validateOptions(schema, options, this.constructor.name);
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(this.constructor.name, (compilation, callback) => {
      // Build the template and save it in the build directory
      const template = fs.readFileSync(this.options.templatePath, 'utf-8');
      const gresource = buildTemplate(template);
      const gresourcePath = path.resolve(this.options.buildDirectory, this.options.outputFilename);
      fs.mkdirSync(this.options.buildDirectory, { recursive: true });
      fs.writeFileSync(gresourcePath, gresource, 'utf-8');

      // Compile the gresource
      const outputPath = path.resolve(this.options.outputPath, this.options.outputFilename);
      fs.mkdirSync(this.options.outputPath, { recursive: true });
      const command = `glib-compile-resources --sourcedir=${this.options.buildDirectory} --target=${outputPath} ${gresourcePath}`;
      exec(command, (err) => {
        if (err) {
          console.error(err);
        }
        callback(err);
      });
    });
  }
}

module.exports = CompileGResourceWebpackPlugin;
