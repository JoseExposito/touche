/*
 * Copyright 2020 José Expósito <jose.exposito89@gmail.com>
 *
 * This file is part of Touchégg-GUI.
 *
 * This program is free software:  you can redistribute it  and/or  modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation,  either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
import { createStore } from 'redux';
import sum5 from '~/test';

// -------------------------------------------------------------------------------------------------
// Redux minimal example on GJS:
const types = {
  INCREMENT: 'INCREMENT',
};

// Define a reducer
const reducer = (state, action) => {
  if (action.type === types.INCREMENT) {
    return { count: state.count + 1 };
  }
  return state;
};

// Define the initial state of our store
const initialState = { count: 0 };

// Create a store, passing our reducer function and our initial state
const store = createStore(reducer, initialState);
log(JSON.stringify(store.getState()));
// -------------------------------------------------------------------------------------------------

const result = sum5(10);
log(result);

// -------------------------------------------------------------------------------------------------

imports.gi.versions.Gtk = '3.0';
const { Gio, Gtk } = imports.gi;

class ImageViewerWindow {
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
    this.box = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL,
    });

    this.image = new Gtk.Image({
      vexpand: true,
    });
    this.box.add(this.image);

    this.fileChooserButton = Gtk.FileChooserButton.new('Pick An Image', Gtk.FileChooserAction.OPEN);

    this.fileChooserButton.connect('file-set', () => {
      // const fileName = button.get_filename();
      const fileName = this.fileChooserButton.get_filename();
      this.image.set_from_file(fileName);
    });

    this.box.add(this.fileChooserButton);
    this.box.show_all();

    this.window.add(this.box);
  }

  getWidget() {
    this.buildUI();
    return this.window;
  }
}

const application = new Gtk.Application({
  application_id: 'org.gnome.Sandbox.ImageViewerExample',
  flags: Gio.ApplicationFlags.FLAGS_NONE,
});

application.connect('activate', (app) => {
  let { activeWindow } = app;

  if (!activeWindow) {
    const imageViewerWindow = new ImageViewerWindow(app);
    activeWindow = imageViewerWindow.getWidget();
  }

  activeWindow.present();
});

application.run(null);
