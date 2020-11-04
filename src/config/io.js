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
const { GLib, Gio } = imports.gi;

/**
 * @returns {string} The user's configuration file path.
 */
export const getUserConfigPath = () => (
  GLib.build_filenamev([GLib.get_home_dir(), '.config', 'touchegg', 'touchegg.conf'])
);

/**
 * @returns {string} The user's configuration file content.
 */
export const getUserConfig = () => {
  const path = getUserConfigPath();
  const file = Gio.File.new_for_path(path);
  const [success, contents] = file.load_contents(null);

  if (!success) {
    // TODO Handle this error
    throw new Error('Error loading config file');
  }

  return contents;
};
