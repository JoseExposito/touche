/*
 * Copyright 2020 - 2022 José Expósito <jose.exposito89@gmail.com>
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
import NoScrollComboBoxText from '~/utils/no-scroll-combo-box-text';

const { GObject, Gtk } = imports.gi;

class TileWindowRowSettings extends Gtk.Grid {
  _init(gesture) {
    super._init({
      row_spacing: 8,
      column_spacing: 16,
    });

    this.gesture = gesture;

    // Left/right label and combo box
    const directionLabel = new Gtk.Label({
      label: _('Direction:'),
      halign: Gtk.Align.END,
    });

    this.directionCombo = new NoScrollComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    this.directionCombo.append('left', _('Tile window to the left half of the screen'));
    this.directionCombo.append('right', _('Tile window to the right half of the screen'));
    this.directionCombo.active_id = gesture?.actionSettings?.direction ?? 'left';

    // Changed signal
    this.directionCombo.connect('changed', () => this.emit('changed'));

    // Layout
    this.attach(directionLabel, 0, 0, 1, 1);
    this.attach(this.directionCombo, 1, 0, 1, 1);
  }

  getSettings() {
    return {
      direction: this.directionCombo.active_id,
    };
  }
}

export default GObject.registerClass(
  {
    Signals: {
      changed: {},
    },
  },
  TileWindowRowSettings,
);
