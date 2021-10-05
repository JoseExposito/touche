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
const {
  GLib,
  GObject,
  Gtk,
  Gdk,
  Touche,
} = imports.gi;

class ShortcutButton extends Gtk.Button {
  static MODIFIERS = [
    'Control_L',
    'Control_R',
    'Super_L',
    'Super_R',
    'Alt_L',
    'Alt_R',
    'ISO_Level3_Shift',
    'Shift_L',
    'Shift_R',
  ];

  _init(modifiers, keys) {
    super._init({ label: '' });

    this.getModifiers = this.getModifiers.bind(this);
    this.getKeys = this.getKeys.bind(this);

    this.modifiers = modifiers ?? [];
    this.keys = keys ?? [];

    this.buildShortcutLabelContent();
    this.connect('clicked', () => this.grabKeyboard());
  }

  getModifiers() {
    return this.modifiers;
  }

  getKeys() {
    return this.keys;
  }

  grabKeyboard() {
    this.label = '-';
    this.saveShortcut();
    this.clearShortcut();

    const window = this.get_root();
    const native = window.get_native();
    const surface = native.get_surface();
    const xid = surface.get_xid();

    GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
      const keyList = Touche.grab_keyboard(xid);
      if (!keyList) {
        log('Error grabbing keyboard');
      } else {
        const keys = [];
        keyList.forEach((keyGString) => {
          const key = keyGString.free(false);
          if (!keys.includes(key)) {
            keys.push(key);
          }
        });

        const cancel = keys.includes('Escape');
        const clear = keys.includes('BackSpace');

        if (clear) {
          this.clearShortcut();
        } else if (cancel) {
          this.restoreShortcut();
        } else {
          keys.forEach((key) => this.addKey(key));
        }

        this.emit('changed');
        this.buildShortcutLabelContent();
      }

      Touche.ungrab();
      return false;
    });
  }

  ungrabKeyboard() {
    const display = Gdk.Display.get_default();
    const seat = display.get_default_seat();
    seat.ungrab();

    this.grab_remove();
  }

  addKey(key) {
    if (ShortcutButton.MODIFIERS.includes(key)) {
      this.modifiers.push(key);
    } else {
      this.keys.push(key);
    }

    // When multiple modifiers are available, make sure to keep the most "important" one in the
    // modifiers array and add the others as keys to make configs like this work:
    // <modifiers>Alt_L</modifiers>
    // <keys>Shift_L+Tab</keys>
    // <decreaseKeys>Tab</decreaseKeys>
    if (this.modifiers.length <= 1) {
      return;
    }

    const shortedModifiers = this.modifiers.sort((a, b) => (
      ShortcutButton.MODIFIERS.indexOf(a) - ShortcutButton.MODIFIERS.indexOf(b)
    ));
    this.modifiers = [shortedModifiers[0]];
    this.keys = [...shortedModifiers.slice(1), ...this.keys];
  }

  clearShortcut() {
    this.keys = [];
    this.modifiers = [];
  }

  buildShortcutLabelContent() {
    if (this.keys.length === 0 && this.modifiers.length === 0) {
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
