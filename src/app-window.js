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
import MainView from '~/main-view';
import XmlConfig from '~/config/xml-config';

const { GObject, Gtk } = imports.gi;

/**
 * Application main window.
 */
class AppWindow extends Gtk.ApplicationWindow {
  _init(application) {
    super._init({
      application,
      defaultWidth: 800,
      defaultHeight: 520,
    });

    XmlConfig.loadConfig();

    this.set_size_request(600, 400);

    this.mainView = new MainView();
    this.add(this.mainView);

    this.show_all();
  }
}

export default GObject.registerClass(AppWindow);
