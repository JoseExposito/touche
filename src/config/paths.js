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
const { GLib, Gio } = imports.gi;

/**
 * @param {string} path File path.
 * @returns {boolean} If the file exists.
 */
export const fileExists = (path) => {
  const file = Gio.File.new_for_path(path);
  return file.query_exists(null);
};

/**
 * @returns {string} User's home directory path (~/.config/touchegg).
 */
export const getUserConfigDirPath = () => (
  GLib.build_filenamev([GLib.get_home_dir(), '.config', 'touchegg'])
);

/**
 * @returns {string} User's config file path (~/.config/touchegg/touchegg.conf).
 */
export const getUserConfigFilePath = () => (
  GLib.build_filenamev([getUserConfigDirPath(), 'touchegg.conf'])
);

/**
 * @returns {string} System config file path (/usr/share/touchegg/touchegg.conf).
 */
export const getSystemConfigFilePath = () => {
  // If $XDG_CONFIG_DIRS is set, check if the config is present in one of those
  // directories. Otherwise, fallback to /etc/xdg, as in the spec:
  // https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
  // Finally, fallback to SYSTEM_CONFIG_FILE_PATH for backwards compatibility.
  let configFilePath = process.env.SYSTEM_CONFIG_FILE_PATH;

  const xdgConfigDirsEnvVar = GLib.getenv('XDG_CONFIG_DIRS');
  const xdgPaths = xdgConfigDirsEnvVar ? xdgConfigDirsEnvVar.split(':') : [];
  xdgPaths.push('/etc/xdg');

  xdgPaths.forEach((path) => {
    const confPath = GLib.build_filenamev([path, 'touchegg', 'touchegg.conf']);
    if (fileExists(confPath)) {
      configFilePath = confPath;
    }
  });

  return configFilePath;
};
