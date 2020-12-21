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
import GestureType from '~/config/gesture-type';
import GestureDirection from '~/config/gesture-direction';

/**
 * Singleton to store the user config in a friendly way.
 */
class Model {
  constructor() {
    this.model = {
      /*
      * Object with shape:
      *  {
      *    [gestureId]: {
      *      id: The same ID used as key,
      *      gestureType: As defined in GestureType,
      *      gestureDirection: As defined in GestureDirection,
      *      numberOfFingers: Number of fingers,
      *      actionType: As defined in ActionType,
      *      actionSettings: Object with the action settings,
      *      appName: "All" or the name of the application,
      *    },
      *    [...]
      *  }
      */
      byId: {},
      allIds: [],

      // Key: appName. Value: Array of gestureIds configured for the application.
      byAppName: {},
      allAppNames: [],
    };
  }

  /**
   * @param {string} gestureType As defined in GestureType.
   * @param {string} gestureDirection As defined in GestureDirection.
   * @param {string} numberOfFingers Number of fingers.
   * @param {string} appName "All" or the name of the application.
   * @returns {string} Unique ID for the gesture.
   */
  static getGestureId(gestureType, gestureDirection, numberOfFingers, appName) {
    return `${gestureType}_${gestureDirection}_${numberOfFingers}_${appName}`;
  }

  addGesture(gestureType, gestureDirection, numberOfFingers, actionType, actionSettings, appName) {
    const id = Model.getGestureId(gestureType, gestureDirection, numberOfFingers, appName);
    this.model = {
      ...this.model,
      byId: {
        ...this.model.byId,
        [id]: {
          gestureType,
          gestureDirection,
          numberOfFingers,
          actionType,
          actionSettings,
          appName,
        },
      },
      allIds: [
        ...this.model.allIds.filter((otherId) => otherId !== id),
        id,
      ],
      byAppName: {
        ...this.model.byAppName,
        [appName]: [
          ...(this.model.byAppName[appName] || []).filter((otherId) => otherId !== id),
          id,
        ],
      },
      allAppNames: [
        ...this.model.allAppNames.filter((otherAppName) => otherAppName !== appName),
        appName,
      ],
    };
  }

  getGesturesByAppName(appName) {
    const ids = this.model.byAppName[appName] || [];
    return ids
      .map((id) => this.model.byId[id])
      .sort((a, b) => {
        if (parseInt(a.numberOfFingers, 10) > parseInt(b.numberOfFingers, 10)) { return 1; }
        if (parseInt(a.numberOfFingers, 10) < parseInt(b.numberOfFingers, 10)) { return -1; }

        const typeIndices = Object.keys(GestureType);
        const aTypeIndex = typeIndices.indexOf(a.gestureType);
        const bTypeIndex = typeIndices.indexOf(b.gestureType);
        if (aTypeIndex > bTypeIndex) { return 1; }
        if (bTypeIndex > aTypeIndex) { return -1; }

        const directionIndices = Object.keys(GestureDirection);
        const aDirectionIndex = directionIndices.indexOf(a.gestureDirection);
        const bDirectionIndex = directionIndices.indexOf(b.gestureDirection);
        return (aDirectionIndex - bDirectionIndex);
      });
  }

  getAppNames() {
    return this.model.allAppNames.sort((a, b) => {
      if (a.toLowerCase() === 'all') { return -1; }
      if (b.toLowerCase() === 'all') { return 1; }
      return a.localeCompare(b);
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
