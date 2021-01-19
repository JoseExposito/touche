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
import model from '~/config/model';

const {
  GObject,
  Gtk,
  Gdk,
  Wnck,
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
    const status = seat.grab(
      window,
      Gdk.SeatCapabilities.ALL_POINTING,
      false,
      Gdk.Cursor.new_for_display(display, Gdk.CursorType.CROSSHAIR),
      null,
      null,
    );

    if (status !== Gdk.GrabStatus.SUCCESS) {
      // TODO Hide the window
      log('Error grabbing mouse and keyboard');
    }

    seat.grab(
      window,
      Gdk.SeatCapabilities.KEYBOARD,
      false,
      Gdk.Cursor.new_for_display(display, Gdk.CursorType.CROSSHAIR),
      null,
      null,
    );
  }

  static ungrabPointer() {
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();
    seat.ungrab();
  }

  mouseClick(event) { // eslint-disable-line
    const mouseX = event.x_root;
    const mouseY = event.y_root;

    const screen = Wnck.Screen.get_default();
    screen.force_update();
    const currentWorkspace = screen.get_active_workspace();

    const windowsUnderCursor = screen.get_windows_stacked()
      .filter((window) => {
        const [x, y, width, height] = window.get_client_window_geometry();
        return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
      })
      .filter((window) => (
        window.is_visible_on_workspace(currentWorkspace)
      ));

    // FIXME: Filtering by workspace excludes windows in the secondary screen in Mutter when the
    //        active workspace is not the first one

    // FIXME: When using CSD, clicking on the shadow returns the wrong window because the atom
    //        _GTK_FRAME_EXTENTS is not being used.

    // TODO: To avoid this issues, I could wrap this method in a C library and use XQueryPointer

    if (windowsUnderCursor.length > 0) {
      const appName = windowsUnderCursor[windowsUnderCursor.length - 1].get_class_instance_name();
      log(`Adding application ${appName} to the model`);
      // TODO
    }

    AddAppView.ungrabPointer();
    this.emit('done');
  }

  keyPress(event) {
    if (event.keyval === Gdk.KEY_Escape) {
      log('CANCEL');
      AddAppView.ungrabPointer();
      this.emit('done');
    }
  }
}

export default GObject.registerClass(
  {
    Signals: {
      done: {},
    },
  },
  AddAppView,
);
