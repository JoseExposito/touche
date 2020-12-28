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

const { GObject, Gtk } = imports.gi;

class TapView extends Gtk.ScrolledWindow {
  _init() {
    super._init();

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.add(new Gtk.Label({ label: 'TAP VIEW' }));
    this.box.show_all();

    this.add(this.box);
  }
}

export default GObject.registerClass(TapView);
