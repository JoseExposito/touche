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
import model from '~/config/model';
import { isAll } from '~/config/all-apps';
import SidebarRow from './sidebar-row';

const { GObject, Gtk } = imports.gi;

class Sidebar extends Gtk.Box {
  _init() {
    super._init({ orientation: Gtk.Orientation.VERTICAL });

    // Add the application list inside a scroll window
    const scrolled = new Gtk.ScrolledWindow();
    this.list = new Gtk.ListBox();
    this.list.selection_mode = Gtk.SelectionMode.BROWSE;
    this.list.expand = true;
    scrolled.add(this.list);

    // Add the footer to allow to add more apps
    const footer = new Gtk.ActionBar();

    const addAppButton = Gtk.Button.new_from_icon_name('list-add-symbolic', Gtk.IconSize.BUTTON);
    addAppButton.tooltip_text = _('Add new application');

    const removeAppButton = Gtk.Button.new_from_icon_name('list-remove-symbolic', Gtk.IconSize.BUTTON);
    removeAppButton.tooltip_text = _('Remove the selected application');

    footer.pack_start(addAppButton);
    footer.pack_start(removeAppButton);

    this.pack_start(scrolled, true, true, 0);
    this.pack_end(footer, false, false, 0);
    this.set_size_request(250, -1);
    this.show_all();

    this.list.connect('row_selected', (self, row) => {
      if (!row) {
        return;
      }

      const { appName } = row;
      log(`Sidebar: App with name "${appName}" selected`);
      removeAppButton.sensitive = !isAll(appName);
      this.emit('appSelected', appName);
    });

    addAppButton.connect('clicked', () => this.emit('addApp'));
    removeAppButton.connect('clicked', () => {
      const appName = this.list.get_selected_row()?.appName;
      if (appName) {
        this.emit('removeApp', appName);
      }
    });
  }

  reloadAppsList(selectedAppName) {
    log('MainView Sidebar: Reloading application list');
    this.list.foreach((row) => this.list.remove(row));

    const appNames = model.getAppNames();
    appNames.forEach((appName) => {
      const icon = Gtk.Image.new_from_icon_name('input-touchpad', Gtk.IconSize.DND);
      // icon.icon_size = Gtk.IconSize.NORMAL; // GTK4 + remove the icon size ^ from the constructor
      const row = new SidebarRow(appName, icon);
      this.list.add(row);

      if (appName.toLowerCase() === selectedAppName.toLowerCase()) {
        log(` - ${appName} [SELECTED]`);
        this.list.select_row(row);
      } else {
        log(` - ${appName}`);
      }
    });

    this.show_all();
  }
}

export default GObject.registerClass(
  {
    Signals: {
      appSelected: {
        param_types: [GObject.TYPE_STRING],
      },
      addApp: {},
      removeApp: {
        param_types: [GObject.TYPE_STRING],
      },
    },
  },
  Sidebar,
);
