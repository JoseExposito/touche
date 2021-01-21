/*
 * Copyright 2020 - 2021 José Expósito <jose.exposito89@gmail.com>
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
import { ALL_ID, isAll } from './all-apps';

/**
 * Singleton to store the user config in a friendly way.
 */
class Model {
  constructor() {
    this.resetModel();
  }

  resetModel() {
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

      // Key: appName
      // Value: Array of gestureIds configured for the application
      byAppName: {
        [ALL_ID]: [],
      },
    };
  }

  loadFromFile() {
    this.resetModel();
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

  addGesture(gesture) {
    const {
      gestureType,
      gestureDirection,
      numberOfFingers,
      actionType,
      actionSettings,
      appName,
      enabled,
    } = gesture;

    this.addGestureFromProps(gestureType, gestureDirection, numberOfFingers, actionType,
      actionSettings, appName, enabled);
  }

  addGestureFromProps(gestureType, gestureDirection, numberOfFingers, actionType, actionSettings,
    appNameUnsafe, enabled) {
    const appName = appNameUnsafe.toLowerCase();

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
      byAppName: {
        ...this.model.byAppName,
        [appName]: [
          ...(this.model.byAppName[appName] || []).filter((otherId) => otherId !== gesture.id),
          gesture.id,
        ],
      },
    };
  }

  addApplication(appNameUnsafe) {
    const appName = appNameUnsafe.toLowerCase();

    if (this.model.byAppName[appName]) {
      return;
    }

    this.model = {
      ...this.model,
      byAppName: {
        ...this.model.byAppName,
        [appName]: [],
      },
    };
  }

  getGlobalSettings() {
    return { ...this.model.globalSettings };
  }

  getAppNames() {
    const appNames = Object.keys(this.model.byAppName);
    return appNames.sort((a, b) => {
      if (isAll(a)) { return -1; }
      if (isAll(b)) { return 1; }
      return a.localeCompare(b);
    });
  }

  getGesturesForApp(appName) {
    const ids = this.model.byAppName[appName.toLowerCase()] ?? [];
    return ids.map((id) => new Gesture({ ...this.model.byId[id] }));
  }

  getGesture(gestureType, gestureDirection, numberOfFingers, appName) {
    const id = Gesture.getId(gestureType, gestureDirection, numberOfFingers, appName);
    return this.model.byId[id]
      ? new Gesture({ ...this.model.byId[id] })
      : new Gesture({
        gestureType,
        gestureDirection,
        numberOfFingers,
        appName,
        enabled: false,
      });
  }

  removeGesture(gesture) {
    this.model = {
      ...this.model,
      byId: Object.fromEntries(
        Object.entries(this.model.byId).filter(([otherId]) => otherId !== gesture.id),
      ),
      byAppName: {
        ...this.model.byAppName,
        [gesture.appName.toLowerCase()]: (this.model.byAppName[gesture.appName.toLowerCase()] || [])
          .filter((otherId) => otherId !== gesture.id),
      },
    };
  }

  removeApplication(appNameUnsafe) {
    const appName = appNameUnsafe.toLowerCase();
    this.model = {
      ...this.model,
      byId: Object.fromEntries(
        Object.entries(this.model.byId).filter(([, gesture]) => gesture.appName !== appName),
      ),
      byAppName: Object.fromEntries(
        Object.entries(this.model.byAppName).filter(([otherAppName]) => otherAppName !== appName),
      ),
    };
  }

  /**
   * Print the model to stdout. For debugging.
   */
  logModel() {
    log(JSON.stringify(this.model, null, 2));
  }
}

export default new Model();
