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
import state from '~/state';
import { getAppNames, getGesturesByAppName } from '~/state/gestures';
import GestureListHeader from './gesture-list-header';
import GestureListRow from './gesture-list-row';

const { Gtk } = imports.gi;

class GestureList extends Gtk.ListBox {
  constructor() {
    super();
    this.set_header_func(GestureList.setHeaders);
  }

  static setHeaders(row1, row2) {
    if (!row2 || (row1.appName !== row2.appName)) {
      row1.set_header(new GestureListHeader(row1.appName));
    }
  }

  loadFromState = () => {
    const appNames = state.select(getAppNames());

    appNames.forEach((appName) => {
      const gestures = state.select(getGesturesByAppName(appName));
      gestures.forEach((gesture) => {
        this.add(new GestureListRow(gesture));
      });
    });

    this.show_all();
  }
}

export default GestureList;
