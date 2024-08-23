/*
 * Copyright 2020 - 2022 José Expósito <jose.exposito89@gmail.com>
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
import model from '~/config/model';
import { ALL_ID, isAll } from '~/config/all-apps';
import Sidebar from './sidebar';
import Content from './content';

const { Adw, GLib, GObject } = imports.gi;

class MainView extends Adw.Bin {
  _init() {
    super._init();

    this.sidebar = new Sidebar();
    this.content = new Content();

    this.splitView = new Adw.NavigationSplitView({
      hexpand: true,
      vexpand: true,
      min_sidebar_width: 250,
      sidebar_width_fraction: 0.3,
    });
    this.splitView.set_sidebar(this.sidebar);
    this.splitView.set_content(this.content);
    this.child = this.splitView;

    this.sidebar.connect('appSelected', (self, appName) => this.content.appSelected(appName));
    this.sidebar.connect('addApp', () => this.emit('addApp'));
    this.sidebar.connect('removeApp', (self, appName) => this.removeApp(appName));

    this.warnAboutWayland();
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

  warnAboutWayland() {
    const sessionType = GLib.getenv('XDG_SESSION_TYPE');

    if (!sessionType || sessionType.toLowerCase() !== 'wayland') {
      return;
    }

    const dialog = new Adw.AlertDialog({
      heading: _('Using Wayland'),
      body: _('Touché and Touchégg are designed to work on X11. Some actions might or might not work on Wayland.'),
    });
    dialog.add_response('ok', 'OK');
    dialog.present(this);
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
