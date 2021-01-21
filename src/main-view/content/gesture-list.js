/*
 * Copyright 2020 - 2021 José Expósito <jose.exposito89@gmail.com>
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
import GestureListRow from './gesture-list-row';

const { GObject, Gtk } = imports.gi;

class GestureList extends Gtk.Box {
  _init(title) {
    super._init({ orientation: Gtk.Orientation.VERTICAL });
    this.showGestures = this.showGestures.bind(this);

    if (Granite) {
      this.titleLabel = new Granite.HeaderLabel({ label: title });
    } else {
      this.titleLabel = new Gtk.Label({ label: title });
      this.titleLabel.get_style_context().add_class('text-h4');
      this.titleLabel.xalign = 0;
    }

    this.list = new Gtk.ListBox({
      selection_mode: Gtk.SelectionMode.NONE,
    });

    this.list.set_header_func((row, before) => {
      if (before) {
        const separator = new Gtk.Separator({ orientation: Gtk.Orientation.HORIZONTAL });
        row.set_header(separator);
      }
    });

    this.listFrame = new Gtk.Frame();
    this.listFrame.add(this.list);

    this.pack_start(this.titleLabel, false, false, 0);
    this.pack_start(this.listFrame, false, false, 12);

    this.show_all();
  }

  showGestures(gestures) {
    this.list.foreach((row) => this.list.remove(row));

    gestures.forEach((gesture) => {
      log(JSON.stringify(gesture));
      this.list.add(new GestureListRow(gesture));
    });

    this.show_all();
  }
}

export default GObject.registerClass(GestureList);
