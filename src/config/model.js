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
import Gesture from './gesture';
import XmlConfig from './xml-config';

/**
 * Singleton to store the user config in a friendly way.
 */
class Model {
  constructor() {
    this.model = {
      /*
       * Object with shape:
       *  {
       *    [property name]: <property value>,
       *    [...]
       *  }
       */
      globalSettings: {},

      /*
       * Object with shape:
       *  {
       *    [gestureId]: {
       *      <Gesture Object>
       *    },
       *    [...]
       *  }
       */
      byId: {},

      // Array of all available gesture IDs
      allIds: [],

      // Key: appName. Value: Array of gestureIds configured for the application.
      byAppName: {},
      allAppNames: [],
    };
  }

  loadFromFile() {
    XmlConfig.loadConfig(this);
  }

  saveToFile() {
    XmlConfig.saveConfig(this);
  }

  addGlobalSetting(name, value) {
    this.model = {
      ...this.model,
      globalSettings: {
        ...this.model.globalSettings,
        [name]: value,
      },
    };
  }

  addGesture(
    gestureType, gestureDirection, numberOfFingers, actionType, actionSettings, appName, enabled,
  ) {
    const gesture = new Gesture({
      gestureType,
      gestureDirection,
      numberOfFingers,
      actionType,
      actionSettings,
      appName,
      enabled,
    });

    this.model = {
      ...this.model,
      byId: {
        ...this.model.byId,
        [gesture.id]: gesture,
      },
      allIds: [
        ...this.model.allIds.filter((otherId) => otherId !== gesture.id),
        gesture.id,
      ],
      byAppName: {
        ...this.model.byAppName,
        [appName]: [
          ...(this.model.byAppName[appName] || []).filter((otherId) => otherId !== gesture.id),
          gesture.id,
        ],
      },
      allAppNames: [
        ...this.model.allAppNames.filter((otherAppName) => otherAppName !== appName),
        appName,
      ],
    };
  }

  getGlobalSettings() {
    return this.model.globalSettings;
  }

  getAppNames() {
    return this.model.allAppNames.sort((a, b) => {
      if (a.toLowerCase() === 'all') { return -1; }
      if (b.toLowerCase() === 'all') { return 1; }
      return a.localeCompare(b);
    });
  }

  getGesturesForApp(appName) {
    const ids = this.model.byAppName[appName];
    return ids.map((id) => this.model.byId[id]);
  }

  getGesture(gestureType, gestureDirection, numberOfFingers, appName) {
    const id = Gesture.getId(gestureType, gestureDirection, numberOfFingers, appName);
    return this.model.byId[id]
      || new Gesture({
        gestureType,
        gestureDirection,
        numberOfFingers,
        appName,
        enabled: false,
      });
  }

  /**
   * Print the model to stdout. For debugging.
   */
  logModel() {
    log(JSON.stringify(this.model, null, 2));
  }
}

export default new Model();
