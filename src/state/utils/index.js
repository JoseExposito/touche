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
 * Creates an action creator.
 * When dispatched, returns a Flux Standard Action.
 *
 * @param {string} type Action type.
 * @param  {...string} paramNames Strings with the required parameters names.
 * @returns {Function} The action creator.
 *
 * @example
 * // Define the action creator:
 * const increaseCount = createAction('counter/add', 'amount');
 *
 * // Use it to add +5 to the counter:
 * dispatch(increaseCount(5));
 *
 * // The dispatched action will look like:
 * // {
 * //   type: 'counter/add',
 * //   payload: {
 * //     amount: 5,
 * //   },
 * // }
 */
export const createAction = (type, ...paramNames) => {
  // Generate a Flux Standard Action with the required parameters
  const actionCreator = (...args) => ({
    type,
    payload: args.reduce((payload, arg, index) => ({
      ...payload,
      [paramNames[index]]: arg,
    }), {}),
  });

  // Override the "toString" method to be able to use the action as key in the reducer
  actionCreator.toString = () => type;

  return actionCreator;
};

/**
 * Wrapper method to create a selector giving it access to the state.
 *
 * @param {Function} func Selector function.
 * @returns {Function} Selector function with state.
 */
export const createSelector = (func) => (...args) => (state) => func(...args, state);

/**
 * Creates a reducer.
 *
 * @param {object} initialState Reducer initial state.
 * @param {object} reducerShape Object defining the reducer, see the example.
 * @returns {Function} The reducer.
 *
 * @example
 * const increaseCount = createAction('counter/add', 'amount');
 *
 * const reducer = createReducer({ count: 0 }, {
 *   [increaseCount]: (state, actionPayload) => ({
 *     count: state.count + actionPayload.amount,
 *   }),
 * });
 */
export const createReducer = (initialState, reducerShape) => {
  const reducer = (state = initialState, action) => {
    let nextState = state;

    if (reducerShape[action.type]) {
      nextState = reducerShape[action.type](state, action.payload);
    }

    return nextState;
  };

  return reducer;
};
