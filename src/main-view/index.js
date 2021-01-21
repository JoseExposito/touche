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
import model from '~/config/model';
import { ALL_ID, isAll } from '~/config/all-apps';
import Sidebar from './sidebar';
import Content from './content';

const { GObject, Gtk } = imports.gi;

class MainView extends Gtk.Paned {
  _init() {
    super._init({ orientation: Gtk.Orientation.HORIZONTAL });

    this.sidebar = new Sidebar();
    this.content = new Content();

    this.pack1(this.sidebar, false, false);
    this.add2(this.content);
    this.show_all();

    this.sidebar.connect('appSelected', (self, appName) => this.content.appSelected(appName));
    this.sidebar.connect('addApp', () => this.emit('addApp'));
    this.sidebar.connect('removeApp', (self, appName) => this.removeApp(appName));
  }

  showAppGestures(appName) {
    this.sidebar.reloadAppsList(appName);
    this.content.appSelected(appName);
  }

  removeApp(appName) {
    if (!appName || isAll(appName)) {
      return;
    }

    log(`Removing app with name "${appName}"`);
    model.removeApplication(appName);
    model.saveToFile();
    this.showAppGestures(ALL_ID);
  }
}

export default GObject.registerClass(
  {
    Signals: {
      addApp: {},
    },
  },
  MainView,
);
