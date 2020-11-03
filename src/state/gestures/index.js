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
import { createAction, createSelector, createReducer } from '../utils';
import GestureType from '~/config/gesture-type';
import GestureDirection from '~/config/gesture-direction';

const initialState = {
  /*
   * Object with shape:
   *  {
   *    [gestureId]: {
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

/**
 * @param {string} gestureType As defined in GestureType.
 * @param {string} gestureDirection As defined in GestureDirection.
 * @param {string} numberOfFingers Number of fingers.
 * @param {string} appName "All" or the name of the application.
 * @returns {string} Unique ID for the gesture.
 */
const getId = (gestureType, gestureDirection, numberOfFingers, appName) => `${gestureType}_${gestureDirection}_${numberOfFingers}_${appName}`;

export const addGesture = createAction('gestures/addGesture', 'gestureType', 'gestureDirection', 'numberOfFingers', 'actionType', 'actionSettings', 'appName');

/**
 * @param {string} id Gesture ID to filter by.
 * @returns {object} A single gesture.
 */
export const getGestureById = createSelector((id, state) => state.gestures.byId[id]);

/**
 * @param {string} appName Application name.
 * @returns {Array} Array of gestures sorted by number of fingers, gesture type, gesture direction.
 */
export const getGesturesByAppName = createSelector((appName, state) => {
  const ids = state.gestures.byAppName[appName] || [];
  return ids
    .map((id) => state.gestures.byId[id])
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
});

/**
 * @returns Array of application names sort alphabetically. "All" is always the first one.
 */
export const getAppNames = createSelector((state) => (
  state.gestures.allAppNames.sort((a, b) => {
    if (a.toLowerCase() === 'all') { return -1; }
    if (b.toLowerCase() === 'all') { return 1; }
    return a.localeCompare(b);
  })
));

const reducer = createReducer(initialState, {
  [addGesture]: (state, {
    gestureType, gestureDirection, numberOfFingers, actionType, actionSettings, appName,
  }) => {
    const id = getId(gestureType, gestureDirection, numberOfFingers, appName);
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          gestureType,
          gestureDirection,
          numberOfFingers,
          actionType,
          actionSettings,
          appName,
        },
      },
      allIds: [...state.allIds.filter((otherId) => otherId !== id), id],
      byAppName: {
        ...state.byAppName,
        [appName]: [...(state.byAppName[appName] || []).filter((otherId) => otherId !== id), id],
      },
      allAppNames: [
        ...state.allAppNames.filter((otherAppName) => otherAppName !== appName),
        appName,
      ],
    };
  },

});

export default reducer;
