/*
 * Copyright 2020 José Expósito <jose.exposito89@gmail.com>
 *
 * This file is part of Touchégg-GUI.
 *
 * This program is free software:  you can redistribute it  and/or  modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation,  either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
import { createStore } from 'redux';
import sum5 from '~/test';

// -------------------------------------------------------------------------------------------------
// Redux minimal example on GJS:
const types = {
  INCREMENT: 'INCREMENT',
};

// Define a reducer
const reducer = (state, action) => {
  if (action.type === types.INCREMENT) {
    return { count: state.count + 1 };
  }
  return state;
};

// Define the initial state of our store
const initialState = { count: 0 };

// Create a store, passing our reducer function and our initial state
const store = createStore(reducer, initialState);
log(JSON.stringify(store.getState()));
// -------------------------------------------------------------------------------------------------

const result = sum5(10);
log(result);
