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
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const validateOptions = require('schema-utils');

/**
 * Webpack plugin to compile po files.
 */
class CompileTranslationsWebpackPlugin {
  constructor(options) {
    const schema = {
      type: 'object',
      additionalProperties: false,
      properties: {
        poPath: {
          type: 'string',
        },
        outputPath: {
          type: 'string',
        },
        packageShortName: {
          type: 'string',
        },
      },
    };

    validateOptions(schema, options, this.constructor.name);
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, () => {
      fs.readdirSync(this.options.poPath)
        .filter((file) => file.endsWith('.po'))
        .forEach((file) => {
          const locale = path.parse(file).name;
          const outputPath = path.resolve(this.options.outputPath, locale, 'LC_MESSAGES');
          const inputFilename = path.resolve(this.options.poPath, file);
          const outputFilename = path.resolve(outputPath, `${this.options.packageShortName}.mo`);

          fs.mkdirSync(outputPath, { recursive: true });

          const command = `msgfmt --output-file=${outputFilename} ${inputFilename}`;
          execSync(command);
        });
    });
  }
}

module.exports = CompileTranslationsWebpackPlugin;
