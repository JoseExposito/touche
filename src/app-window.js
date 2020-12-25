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
import NotInstalledView from '~/not-installed-view';
import XmlConfig from '~/config/xml-config';
import { fileExists, getSystemConfigFilePath } from '~/config/paths';

const { GObject, Gtk } = imports.gi;

/**
 * Application main window.
 */
class AppWindow extends Gtk.ApplicationWindow {
  _init(application) {
    super._init({
      application,
    });

    // If Touchégg is not installed, show a screen to allow to download it
    // Otherwise, start the app showing the main view
    if (AppWindow.isToucheggInstalled()) {
      this.showMainView();
    } else {
      this.showNonInstalledView();
    }

    this.show_all();
  }

  static isToucheggInstalled() {
    return fileExists(getSystemConfigFilePath());
  }

  showNonInstalledView() {
    this.set_size_request(300, 180);

    this.notInstalledView = new NotInstalledView();
    this.add(this.notInstalledView);

    this.notInstalledView.connect('installed', () => {
      if (AppWindow.isToucheggInstalled()) {
        this.remove(this.notInstalledView);
        this.showMainView();
      }
    });
  }

  showMainView() {
    XmlConfig.loadConfig();

    this.set_size_request(1000, 750);

    this.mainView = new MainView();
    this.add(this.mainView);
  }
}

export default GObject.registerClass(AppWindow);
