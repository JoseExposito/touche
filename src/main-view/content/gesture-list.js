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
import GestureListRow from './gesture-list-row';

const { GObject, Gtk } = imports.gi;

class GestureList extends Gtk.Box {
  _init(title) {
    super._init({ orientation: Gtk.Orientation.VERTICAL });
    this.showGestures = this.showGestures.bind(this);

    this.titleLabel = new Gtk.Label({ label: title });
    this.titleLabel.get_style_context().add_class('text-h4');
    this.titleLabel.xalign = 0;
    this.titleLabel.margin_start = 12;
    this.titleLabel.margin_end = 12;
    this.titleLabel.margin_top = 12;
    this.titleLabel.margin_bottom = 12;

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
    this.listFrame.set_child(this.list);
    this.listFrame.margin_start = 12;
    this.listFrame.margin_end = 12;
    this.listFrame.margin_bottom = 12;

    this.append(this.titleLabel);
    this.append(this.listFrame);
  }

  showGestures(gestures) {
    let child = this.list.get_row_at_index(0);
    while (child) {
      this.list.remove(child);
      child = this.list.get_row_at_index(0);
    }

    gestures.forEach((gesture) => {
      log(JSON.stringify(gesture));
      this.list.append(new GestureListRow(gesture));
    });
  }
}

export default GObject.registerClass(GestureList);
