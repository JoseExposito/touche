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
import { getUserConfigFilePath } from './paths';
import model from './model';

const { GLib, Gio } = imports.gi;

/**
 * Load and save the `Model` from/to file.
 */
class XmlConfig {
  static loadConfig() {
    // TODO Use the system config if the user config is not present

    log('Reading configuration file');
    const configXml = XmlConfig.readFile(getUserConfigFilePath());
    const config = XmlToJson.xml2js(configXml, { compact: true });
    log(JSON.stringify(config, null, 2));

    const actionSettingsFromXmlObject = (actionXml) => (
      Object.entries(actionXml)
        .filter(([key]) => key !== '_attributes')
        .reduce((res, [key, { _text }]) => ({ ...res, [key]: _text }), {})
    );

    const apps = config['touchégg'].application;
    apps.forEach((app) => {
      const appName = app._attributes.name;
      const gestures = app.gesture;

      gestures.forEach((gesture) => {
        const gestureType = gesture._attributes.type;
        const gestureDirection = gesture._attributes.direction;
        const numberOfFingers = gesture._attributes.fingers;

        const actionType = gesture.action._attributes.type;
        const actionSettings = actionSettingsFromXmlObject(gesture.action);

        log(`Adding gesture: ${gestureType}, ${gestureDirection}, ${numberOfFingers}, ${actionType}, ${appName}`);

        // TODO Handle app names separated by commas?
        model.addGesture(
          gestureType,
          gestureDirection,
          numberOfFingers,
          actionType,
          actionSettings,
          appName,
        );
      });
    });

    model.logModel();
  }

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
