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
import Sidebar from './sidebar';
import Content from './content';
import Views from './views';

const { GObject, Gtk } = imports.gi;

class MainView extends Gtk.Paned {
  _init() {
    super._init({ orientation: Gtk.Orientation.HORIZONTAL });

    this.sidebar = new Sidebar(Views.SWIPE_VIEW);
    this.content = new Content(Views.SWIPE_VIEW);

    this.pack1(this.sidebar, false, false);
    this.add2(this.content);
    this.show_all();
  }
}

export default GObject.registerClass(MainView);
