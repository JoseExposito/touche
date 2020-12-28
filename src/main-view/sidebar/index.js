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
import model from '~/config/model';
import SidebarRow from './sidebar-row';

const { GObject, Gtk } = imports.gi;

class Sidebar extends Gtk.Box {
  _init() {
    super._init({ orientation: Gtk.Orientation.VERTICAL });

    // Add the application list inside a scroll window
    const scrolled = new Gtk.ScrolledWindow();
    const list = new Gtk.ListBox();
    list.selection_mode = Gtk.SelectionMode.SINGLE;
    list.expand = true;
    scrolled.add(list);

    const appNames = model.getAppNames();
    appNames.forEach((appName, index) => {
      const icon = Gtk.Image.new_from_icon_name('input-touchpad', Gtk.IconSize.DND);
      // icon.icon_size = Gtk.IconSize.NORMAL; // GTK4 + remove the icon size ^ from the constructor
      const row = new SidebarRow(appName, icon);
      list.add(row);

      if (index === 0) {
        list.select_row(row);
      }
    });

    // Add the footer to allow to add more apps
    const footer = new Gtk.ActionBar();

    const addAppButton = Gtk.Button.new_from_icon_name('list-add-symbolic', Gtk.IconSize.BUTTON);
    addAppButton.tooltip_text = _('sidebar-add-app');

    const removeAppButton = Gtk.Button.new_from_icon_name('list-remove-symbolic', Gtk.IconSize.BUTTON);
    removeAppButton.tooltip_text = _('sidebar-remove-app');

    footer.get_style_context().add_class(Gtk.STYLE_CLASS_INLINE_TOOLBAR);
    footer.pack_start(addAppButton);
    footer.pack_start(removeAppButton);

    this.pack_start(scrolled, true, true, 0);
    this.pack_end(footer, false, false, 0);
    this.set_size_request(250, -1);
    this.show_all();

    list.connect('row_selected', (self, row) => {
      const { appName } = row;
      log(`Sidebar: App with name "${appName}" selected`);
      this.emit('appSelected', appName);
    });
  }
}

export default GObject.registerClass(
  {
    Signals: {
      appSelected: {
        param_types: [GObject.TYPE_STRING],
      },
    },
  },
  Sidebar,
);
