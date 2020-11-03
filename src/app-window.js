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
import GestureList from '~/gesture-list';

import state from '~/state';
import { loadConfig } from '~/state/config';

const { Gtk } = imports.gi;

/**
 * Application main window.
 */
class AppWindow {
  constructor(app) {
    this.app = app;
    this.window = null;
    this.box = null;
    this.image = null;
    this.fileChooserButton = null;
  }

  async buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.app,
      defaultHeight: 600,
      defaultWidth: 800,
    });

    await state.dispatch(loadConfig());

    this.grid = new Gtk.Grid({
      orientation: Gtk.Orientation.VERTICAL,
    });

    this.grid.add(new Gtk.Label({ label: _('hello') }));
    this.grid.add(new Gtk.Label({ label: _('world') }));

    this.gestureList = new GestureList();
    this.gestureList.loadFromState();
    this.grid.add(this.gestureList);

    // TEST
    this.button = new Gtk.Button ({ label: "FOO" });
    this.button.connect ('clicked', () => this.gestureList.loadFromState());
    this.grid.add(this.button);


    this.grid.show_all();
    this.window.add(this.grid);
  }

  async getWidget() {
    await this.buildUI();
    return this.window;
  }
}

export default AppWindow;
