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
const { GObject, Gtk, Gdk } = imports.gi;
const MODIFIERS = ['Control_L', 'Alt_L', 'ISO_Level3_Shift', 'Control_R', 'Shift_L', 'Shift_R'];

class ShortcutButton extends Gtk.Button {
  _init(modifiers, keys) {
    super._init({ label: '' });

    // bind functions
    this.getModifiers = this.getModifiers.bind(this);
    this.getKeys = this.getKeys.bind(this);

    // modifiers/keys lists
    this.modifiers = modifiers ?? [];
    this.keys = keys ?? [];

    this.buildShortcutLabelContent();

    this.connect('clicked', () => {
      this.grabKeyboard();
      this.saveShortcut();
      this.clearShortcut();
    });

    this.connect('focus-out-event', () => this.ungrabKeyboard());

    this.connect('key-press-event', (widget, event) => {
      const keyval = event.get_keyval()[1];
      const key = Gdk.keyval_name(keyval);

      // if no grab, no key/modifier registering
      if (!widget.has_grab()) {
        return;
      }

      if (this.modifiers.includes(key) || this.keys.includes(key)) {
        return;
      }

      // If backspace, clear
      if (keyval === Gdk.KEY_BackSpace) {
        this.ungrabKeyboard();
        this.clearShortcut();
        widget.emit('changed');
        return;
      }

      // If escape, cancel
      if (keyval === Gdk.KEY_Escape) {
        this.ungrabKeyboard();
        this.restoreShortcut();
        this.buildShortcutLabelContent();
        widget.emit('changed');
        return;
      }

      // if modifier
      if (MODIFIERS.includes(key)) {
        this.modifiers.push(key);
      } else {
        this.keys.push(key);
      }

      widget.emit('changed');
      this.buildShortcutLabelContent();
    });

    this.connect('key-release-event', () => {
      this.ungrabKeyboard();
      this.buildShortcutLabelContent();
    });
  }

  getModifiers() {
    return this.modifiers;
  }

  getKeys() {
    return this.keys;
  }

  grabKeyboard() {
    const window = this.get_toplevel().get_window();
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();

    const status = seat.grab(window, Gdk.SeatCapabilities.KEYBOARD, false, null, null, null);

    if (status !== Gdk.GrabStatus.SUCCESS) {
      log('Error grabbing keyboard');
      return;
    }

    this.grab_add();
  }

  ungrabKeyboard() {
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();
    seat.ungrab();

    this.grab_remove();
  }

  clearShortcut() {
    this.keys = [];
    this.modifiers = [];
    this.buildShortcutLabelContent();
  }

  buildShortcutLabelContent() {
    if (this.has_grab() && [...this.modifiers, ...this.keys].length === 0) {
      this.label = '-';
    } else if (!(this.keys.length > 0 || this.modifiers.length > 0)) {
      this.label = _('Click here to add shortcut');
    } else {
      this.label = [...this.modifiers, ...this.keys].toString().replace(/,/g, '+');
    }
  }

  /**
   * Save the current shortcut to restore it with "restoreShortcut".
   */
  saveShortcut() {
    this.modifiersBackup = this.modifiers;
    this.keysBackup = this.keys;
  }

  /**
   * Restore the shortcut saved with "saveShortcut".
   */
  restoreShortcut() {
    this.modifiers = this.modifiersBackup;
    this.keys = this.keysBackup;
  }
}

export default GObject.registerClass(
  {
    Signals: {
      changed: {},
    },
  },
  ShortcutButton,
);
