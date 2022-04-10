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
import { ALL_ID } from '~/config/all-apps';

const {
  GLib,
  GObject,
  Gtk,
  Touche,
} = imports.gi;

class AddAppView extends Gtk.Box {
  _init() {
    super._init({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 12,
      margin_top: 24,
      margin_bottom: 24,
      margin_start: 24,
      margin_end: 24,
    });

    const title = new Gtk.Label({
      label: _('Add application'),
      hexpand: true,
      vexpand: true,
      valign: Gtk.Align.END,
    });
    title.get_style_context().add_class('text-h2');

    const description = new Gtk.Label({
      label: _('Add gestures for an application. Click on its window'),
      hexpand: true,
      vexpand: true,
      valign: Gtk.Align.START,
    });
    description.get_style_context().add_class('text-h3');

    this.append(title);
    this.append(description);
  }

  grabPointer() {
    const window = this.get_root();
    const native = window.get_native();
    const surface = native.get_surface();
    const xid = surface.get_xid();

    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, () => {
      if (!Touche.grab_pointer(xid)) {
        log('Error grabbing mouse and keyboard');
        this.emit('done', ALL_ID);
      } else {
        const appName = Touche.get_window_under_cursor_class_name().free(false);
        if (appName) {
          model.addApplication(appName);
          model.saveToFile();
        }
        this.emit('done', appName || ALL_ID);
      }

      Touche.ungrab();
      return false;
    });
  }
}

export default GObject.registerClass(
  {
    Signals: {
      done: {
        param_types: [GObject.TYPE_STRING],
      },
    },
  },
  AddAppView,
);
