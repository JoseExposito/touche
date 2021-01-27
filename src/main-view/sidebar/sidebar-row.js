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
import { isAll } from '~/config/all-apps';

const { GObject, Gtk } = imports.gi;

class SidebarRow extends Gtk.ListBoxRow {
  _init(appName, icon) {
    super._init();
    this.appName = appName;

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
    this.box.margin = 8;
    this.box.pack_start(icon, false, false, 8);

    const label = new Gtk.Label({ label: SidebarRow.displayName(appName) });
    const labelClass = Granite ? Granite.STYLE_CLASS_H3_LABEL : 'text-h3';
    label.get_style_context().add_class(labelClass);

    this.box.pack_start(label, false, false, 0);
    this.box.show_all();

    this.add(this.box);
  }

  /**
   * Returns a better human readable string for an application name.
   *
   * @param {string} appName The application class name.
   * @returns {string} The formatted equivalent.
   */
  static displayName(appName) {
    if (isAll(appName)) {
      return _('Global gestures');
    }

    // Reverse domain named apps (com.example.app) are not treated
    if (/([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/.test(appName)) {
      return appName;
    }

    return appName
      .trim()
      .toLowerCase()
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }
}

export default GObject.registerClass(SidebarRow);
