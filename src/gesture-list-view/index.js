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
import GestureList from '~/gesture-list-view/gesture-list';
import styles from './styles.css';

const { Gtk, Gdk } = imports.gi;

/**
 * Main view with the gesture list.
 */
class GestureListView extends Gtk.Grid {
  static VIEW_NAME = 'GestureListView';

  constructor() {
    super({ orientation: Gtk.Orientation.VERTICAL });

    this.scrollArea = new Gtk.ScrolledWindow();
    this.scrollArea.expand = true;

    this.gestureList = new GestureList();
    this.gestureList.loadFromState();

    // TODO
    this.addGestureBtn = new Gtk.Button({ label: 'FOO' });
    this.addGestureBtn.connect('clicked', () => this.gestureList.loadFromState());

    this.scrollArea.add(this.gestureList);
    this.add(this.scrollArea);
    this.add(this.addGestureBtn);

    // CSS styles
    this.get_style_context().add_class('glv');
    const provider = new Gtk.CssProvider();
    provider.load_from_path(styles);
    Gtk.StyleContext.add_provider_for_screen(Gdk.Screen.get_default(), provider,
      Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);
  }
}

export default GestureListView;
