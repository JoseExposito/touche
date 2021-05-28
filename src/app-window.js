/*
 * Copyright 2020 - 2021 José Expósito <jose.exposito89@gmail.com>
 *
 * This file is part of Touché.
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
import NotInstalledView from '~/not-installed-view';
import MainView from '~/main-view';
import AddAppView from '~/add-app-view';
import model from '~/config/model';
import { ALL_ID } from '~/config/all-apps';
import { fileExists, getSystemConfigFilePath } from '~/config/paths';

const { GObject, Gtk } = imports.gi;

/**
 * Application main window.
 */
class AppWindow extends Gtk.ApplicationWindow {
  _init(application) {
    super._init({
      application,
      title: 'Touché',
    });

    this.showMainView = this.showMainView.bind(this);
    this.showAddAppView = this.showAddAppView.bind(this);
    this.showingAddAppView = false;

    this.mainView = new MainView();
    this.mainView.connect('addApp', this.showAddAppView);

    this.addAppView = new AddAppView(this);
    this.addAppView.connect('done', (self, appName) => {
      this.showingAddAppView = false;
      this.remove(this.addAppView);
      this.showMainView(appName);

      this.show();
    });

    // If Touchégg is not installed, show a screen to allow to download it
    // Otherwise, start the app showing the main view
    if (AppWindow.isToucheggInstalled()) {
      this.showMainView(ALL_ID);
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
        this.showMainView(ALL_ID);
      }
    });
  }

  showMainView(selectedAppName) {
    model.loadFromFile();
    this.set_size_request(900, 650);
    this.add(this.mainView);
    this.mainView.showAppGestures(selectedAppName);
  }

  showAddAppView() {
    this.showingAddAppView = true;
    this.set_size_request(300, 180);
    this.remove(this.mainView);
    this.add(this.addAppView);
    this.addAppView.grabPointer();
  }

  // When the user add a new application, the mouse pointer and the keyboard are grabbed.
  // This virtual methods are called when a mouse or keyboard event is dispatched and, if required,
  // the event is passed down to the add application view.

  vfunc_button_press_event(event) { // eslint-disable-line camelcase
    if (this.showingAddAppView) {
      this.addAppView.mouseClick(event);
      return true;
    }
    return false;
  }

  vfunc_key_release_event(event) { // eslint-disable-line camelcase
    if (this.showingAddAppView) {
      this.addAppView.keyPress(event);
      return true;
    }
    return false;
  }
}

export default GObject.registerClass(AppWindow);
