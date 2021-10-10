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

const { Adw, GObject, Gtk } = imports.gi;

class Sidebar extends Gtk.Box {
  _init() {
    super._init({ orientation: Gtk.Orientation.VERTICAL });

    // Add the application list inside a scroll window
    this.list = new Gtk.ListBox();
    this.list.selection_mode = Gtk.SelectionMode.BROWSE;
    this.list.vexpand = true;

    const scrolled = new Gtk.ScrolledWindow();
    scrolled.vexpand = true;
    scrolled.set_child(this.list);

    // Add the footer to allow to add more apps
    const addAppButton = Gtk.Button.new_from_icon_name('list-add-symbolic');
    addAppButton.tooltip_text = _('Add new application');

    const removeAppButton = Gtk.Button.new_from_icon_name('list-remove-symbolic');
    removeAppButton.tooltip_text = _('Remove the selected application');

    const buttonContainer = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
    buttonContainer.get_style_context().add_class('linked');
    buttonContainer.append(addAppButton);
    buttonContainer.append(removeAppButton);

    const footer = new Gtk.ActionBar();
    footer.pack_start(buttonContainer);

    // Header
    const header = new Adw.HeaderBar();
    header.set_decoration_layout('menu');
    header.set_title_widget(new Gtk.Label({ label: _('Applications') }));

    // Layout
    this.append(header);
    this.append(scrolled);
    this.append(footer);
    this.set_size_request(200, -1);
    this.baseline_position = Gtk.BaselinePosition.BOTTOM;

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
    let child = this.list.get_row_at_index(0);
    while (child) {
      this.list.remove(child);
      child = this.list.get_row_at_index(0);
    }

    const appNames = model.getAppNames();
    appNames.forEach((appName) => {
      const icon = Gtk.Image.new_from_icon_name('input-touchpad');
      icon.icon_size = Gtk.IconSize.LARGE;
      const row = new SidebarRow(appName, icon);
      this.list.append(row);

      if (appName.toLowerCase() === selectedAppName.toLowerCase()) {
        log(` - ${appName} [SELECTED]`);
        this.list.select_row(row);
      } else {
        log(` - ${appName}`);
      }
    });
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
