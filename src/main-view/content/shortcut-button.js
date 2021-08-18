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
  _init(gesture) {
    super._init({ label: '' });

    // bind functions
    this.getModifiers = this.getModifiers.bind(this);
    this.getKeys = this.getKeys.bind(this);

    // modifiers/keys lists
    this.modifiers = [];
    this.keys = [];

    // map initial settings with arrays
    if (gesture?.actionSettings?.modifiers !== undefined
      && gesture.actionSettings.modifiers.length > 0) {
      this.modifiers = gesture.actionSettings.modifiers.split('+');
    }

    if (gesture?.actionSettings?.keys !== undefined
      && gesture?.actionSettings?.keys.length > 0) {
      this.keys = gesture.actionSettings.keys.split('+');
    }

    this.buildShortcutLabelContent();

    this.connect('clicked', () => {
      this.grab_add();
      this.clearShortcut();
    });

    this.connect('focus-out-event', () => {
      // ensure we don´t keep grab when focus out
      this.grab_remove();
    });
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

      /// if escape, clear
      if (keyval === Gdk.KEY_Escape) {
        widget.grab_remove();
        this.clearShortcut();
        return;
      }
      // if modifier
      if (MODIFIERS.includes(key)) {
        this.modifiers.push(key);
      } else {
        this.keys.push(key);
      }

      this.buildShortcutLabelContent();
      widget.emit('changed');
    });

    this.connect('key-release-event', (widget) => widget.grab_remove());
  }

  getModifiers() {
    return this.modifiers.toString().replace(/,/g, '+');
  }

  getKeys() {
    return this.keys.toString().replace(/,/g, '+');
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
}

export default GObject.registerClass(
  {
    Signals: {
      changed: {},
    },
  },
  ShortcutButton,
);
