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
/* eslint-disable no-underscore-dangle */
import XmlToJson from 'xml-js';
import GestureDirection from './gesture-direction';
import { getUserConfigFilePath, getSystemConfigFilePath, fileExists } from './paths';
import model from './model';

const { Gio } = imports.gi;

/**
 * Load and save the `Model` from/to file.
 */
class XmlConfig {
  /**
   * Parse the configuration file and load it in the `Model`.
   */
  static loadConfig() {
    const configFilePath = fileExists(getUserConfigFilePath())
      ? getUserConfigFilePath()
      : getSystemConfigFilePath();

    log(`Reading configuration file "${configFilePath}"`);
    const configXml = XmlConfig.readFile(configFilePath);
    const config = XmlToJson.xml2js(configXml, { compact: true });

    const actionSettingsFromXmlObject = (actionXml) => (
      Object.entries(actionXml)
        .filter(([key]) => key !== '_attributes')
        .reduce((res, [key, { _text }]) => ({ ...res, [key]: _text }), {})
    );

    const apps = config['touchégg'].application;
    apps.forEach((app) => {
      const appNames = app._attributes.name;
      const gestures = app.gesture;

      gestures.forEach((gesture) => {
        const gestureType = gesture._attributes.type;
        const gestureDirection = gesture._attributes.direction || GestureDirection.UNKNOWN;
        const numberOfFingers = gesture._attributes.fingers;

        const actionType = gesture.action._attributes.type;
        const actionSettings = actionSettingsFromXmlObject(gesture.action);

        appNames.split(',').forEach((appName) => {
          const safeAppName = appName.trim();

          // TODO Allow to enable/disable gestures in the config file
          const enabled = true;

          log(`Adding gesture: ${gestureType}, ${gestureDirection}, ${numberOfFingers}, ${actionType}, ${safeAppName}, enabled: ${enabled}`);
          model.addGesture(
            gestureType,
            gestureDirection,
            numberOfFingers,
            actionType,
            actionSettings,
            safeAppName,
            enabled,
          );
        });
      });
    });

    model.logModel();
  }

  /**
   * @param {string} path File path.
   * @returns {string} The file contents.
   */
  static readFile(path) {
    const file = Gio.File.new_for_path(path);
    const [success, contents] = file.load_contents(null);

    if (!success) {
    // TODO Handle this error
      throw new Error('Error loading config file');
    }

    return contents;
  }
}

export default XmlConfig;
