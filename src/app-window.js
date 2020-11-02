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
import GestureList from '~/gesture-list';
import GestureListRow from '~/gesture-list-row';
import ActionType from '~/config/action-type';
import GestureType from '~/config/gesture-type';
import GestureDirection from '~/config/gesture-direction';
import state from '~/state';
import { loadConfig } from '~/state/config';

const { Gtk } = imports.gi;

/**
 * Application main window.
 */
class AppWindow {
  constructor(app) {
    this.app = app;
    this.window = null;
    this.box = null;
    this.image = null;
    this.fileChooserButton = null;
  }

  buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.app,
      defaultHeight: 600,
      defaultWidth: 800,
    });

    this.grid = new Gtk.Grid({
      orientation: Gtk.Orientation.VERTICAL,
    });

    // TODO Test
    state.dispatch(loadConfig());

    this.gestureList = new GestureList();
    this.gestureList.add(new GestureListRow(GestureType.SWIPE, GestureDirection.DOWN, 3, ActionType.MINIMIZE_WINDOW));
    this.gestureList.add(new GestureListRow(GestureType.PINCH, GestureDirection.DOWN, 3, ActionType.MINIMIZE_WINDOW));
    this.gestureList.add(new GestureListRow(GestureType.PINCH, GestureDirection.DOWN, 3, ActionType.MINIMIZE_WINDOW));
    this.gestureList.add(new GestureListRow(GestureType.PINCH, GestureDirection.DOWN, 3, ActionType.MINIMIZE_WINDOW));
    this.gestureList.add(new GestureListRow(GestureType.PINCH, GestureDirection.DOWN, 3, ActionType.MINIMIZE_WINDOW));

    this.grid.add(new Gtk.Label({ label: _('hello') }));
    this.grid.add(new Gtk.Label({ label: _('world') }));

    this.grid.add(this.gestureList);

    this.grid.show_all();
    this.window.add(this.grid);

    // this.box = new Gtk.Box({
    //   orientation: Gtk.Orientation.VERTICAL,
    // });

    // this.image = new Gtk.Image({
    //   vexpand: true,
    // });
    // this.box.add(this.image);

    // this.fileChooserButton = Gtk.FileChooserButton.new('Pick An Image', Gtk.FileChooserAction.OPEN);

    // this.fileChooserButton.connect('file-set', () => {
    //   // const fileName = button.get_filename();
    //   const fileName = this.fileChooserButton.get_filename();
    //   this.image.set_from_file(fileName);
    // });

    // this.box.add(this.fileChooserButton);

    // const label = new Gtk.Label({ label: _('hello') });
    // this.box.add(label);

    // this.box.show_all();

    // this.window.add(this.box);
  }

  getWidget() {
    this.buildUI();
    return this.window;
  }
}

export default AppWindow;
