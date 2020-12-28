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

/**
 * Class that represents a gesture configuration.
 */
class Gesture {
  /**
   * @param {object} config Gesture configuration object.
   * @param {string} config.gestureType As defined in GestureType.
   * @param {string} config.gestureDirection As defined in GestureDirection.
   * @param {string} config.numberOfFingers Number of fingers.
   * @param {string} config.actionType As defined in ActionType.
   * @param {object} config.actionSettings Object with the action settings.
   * @param {string} config.appName "All" or the name of the application.
   * @param {string} config.enabled In the gesture is enabled or not.
   */
  constructor({
    gestureType,
    gestureDirection,
    numberOfFingers,
    actionType,
    actionSettings,
    appName,
    enabled,
  }) {
    this.id = Gesture.getId(gestureType, gestureDirection, numberOfFingers, appName);
    this.gestureType = gestureType;
    this.gestureDirection = gestureDirection;
    this.numberOfFingers = numberOfFingers;
    this.actionType = actionType;
    this.actionSettings = actionSettings;
    this.appName = appName;
    this.enabled = enabled;
  }

  /**
   * @param {string} gestureType As defined in GestureType.
   * @param {string} gestureDirection As defined in GestureDirection.
   * @param {string} numberOfFingers Number of fingers.
   * @param {string} appName "All" or the name of the application.
   * @returns {string} Unique ID for the gesture.
   */
  static getId(gestureType, gestureDirection, numberOfFingers, appName) {
    return `${gestureType}_${gestureDirection}_${numberOfFingers}_${appName}`;
  }
}

export default Gesture;
