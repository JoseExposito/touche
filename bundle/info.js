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

const rootPath = process.cwd();
const srcPath = path.resolve(rootPath, 'src');
const dataPath = path.resolve(rootPath, 'data');
const i18nPath = path.resolve(rootPath, 'po');
const buildPath = path.resolve(rootPath, 'build');
const buildInstallPath = path.resolve(buildPath, 'install');
const buildBundlePath = path.resolve(buildPath, 'bundle');

const templatesPath = path.resolve(rootPath, 'bundle', 'templates');
const entryTemplateName = 'entry.template';
const entryBinTemplateName = 'entry.bin.template';
const srcGResourceTemplateName = 'src.gresource.xml.template';

const packageJson = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'package.json'), 'utf-8'));
const {
  name,
  version,
  description,
  keywords,
  main,
  license,
  homepage,
  bugs,
  author,
} = packageJson;

/**
 * Export relevant information about the project.
 */
module.exports = {
  rootPath,
  srcPath,
  dataPath,
  i18nPath,
  buildPath,
  buildInstallPath,
  buildBundlePath,

  templatesPath,
  entryTemplateName,
  entryBinTemplateName,
  srcGResourceTemplateName,

  package: {
    name,
    version,
    description,
    keywords,
    main: path.resolve(rootPath, main),
    license,
    homepage,
    bugs: bugs && bugs.url,
    author,
    gresourceName: `/${name.replace(/\./g, '/')}/js`,
    shortName: name.split('.').pop(),
  },
};
