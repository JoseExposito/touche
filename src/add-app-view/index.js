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
import model from '~/config/model';
import { ALL_ID } from '~/config/all-apps';

const {
  GObject,
  Gtk,
  Gdk,
  Touche,
} = imports.gi;

class AddAppView extends Gtk.Box {
  _init(parentWindow) {
    super._init({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 12,
      margin: 24,
    });

    this.mouseClick = this.mouseClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.parentWindow = parentWindow;

    const title = new Gtk.Label({
      label: _('Add application'),
      hexpand: true,
      valign: Gtk.Align.BASELINE,
    });
    const titleClass = Granite ? Granite.STYLE_CLASS_H2_LABEL : 'text-h2';
    title.get_style_context().add_class(titleClass);

    const description = new Gtk.Label({
      label: _('Add gestures for an application. Click on it\'s window'),
      hexpand: true,
      valign: Gtk.Align.START,
    });
    const descriptionClass = Granite ? Granite.STYLE_CLASS_H3_LABEL : 'text-h3';
    description.get_style_context().add_class(descriptionClass);

    const centerBox = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 12,
      margin: 24,
    });
    centerBox.pack_start(title, true, false, 0);
    centerBox.pack_start(description, true, false, 0);
    this.pack_start(centerBox, true, false, 0);
    this.show_all();
  }

  grabPointer() {
    const window = this.parentWindow.get_window();
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();

    const status = seat.grab(window, Gdk.SeatCapabilities.ALL_POINTING, false,
      Gdk.Cursor.new_for_display(display, Gdk.CursorType.CROSSHAIR), null, null);

    if (status !== Gdk.GrabStatus.SUCCESS) {
      log('Error grabbing mouse and keyboard');
      this.emit('done', ALL_ID);
    }
  }

  static ungrabPointer() {
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();
    seat.ungrab();
  }

  mouseClick(event) { // eslint-disable-line
    const appName = Touche.get_window_under_cursor_class_name().free(false);
    if (appName) {
      model.addApplication(appName);
      model.saveToFile();
    }

    AddAppView.ungrabPointer();

    this.emit('done', appName || ALL_ID);
  }

  keyPress(event) {
    if (event.keyval === Gdk.KEY_Escape) {
      log('CANCEL');
      AddAppView.ungrabPointer();
      this.emit('done', ALL_ID);
    }
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
