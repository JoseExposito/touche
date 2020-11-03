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
const { Gtk } = imports.gi;

class GestureListRow extends Gtk.ListBoxRow {
  constructor({
    gestureType,
    gestureDirection,
    numberOfFingers,
    actionType,
    actionSettings,
    appName,
  }) {
    super();
    this.gestureType = gestureType;
    this.gestureDirection = gestureDirection;
    this.numberOfFingers = numberOfFingers;
    this.actionType = actionType;
    this.actionSettings = actionSettings;
    this.appName = appName;

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    this.box.add(new Gtk.Label({ label: gestureType }));
    this.box.add(new Gtk.Label({ label: gestureDirection }));
    this.box.add(new Gtk.Label({ label: `${numberOfFingers}` }));
    this.box.add(new Gtk.Label({ label: actionType }));

    // TODO Testing
    const image = Gtk.Image.new_from_icon_name('bluetooth', Gtk.IconSize.DND);
    this.box.add(image);

    this.box.show_all();
    this.add(this.box);
  }
}

export default GestureListRow;
