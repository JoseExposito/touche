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

class MouseClickRowSettings extends Gtk.Grid {
  _init(gesture) {
    super._init({
      row_spacing: 8,
      column_spacing: 16,
    });

    this.gesture = gesture;

    // Mouse button label and combo box
    const buttonLabel = new Gtk.Label({
      label: _('Mouse button:'),
      halign: Gtk.Align.END,
    });

    this.buttonCombo = new NoScrollComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    this.buttonCombo.append('1', _('Left click'));
    this.buttonCombo.append('3', _('Right click'));
    this.buttonCombo.append('2', _('Middle click'));
    this.buttonCombo.append('8', _('Back'));
    this.buttonCombo.append('9', _('Forward'));
    this.buttonCombo.active_id = gesture?.actionSettings?.button ?? '1';

    // On begin/end combo
    const onBeginEndLabel = new Gtk.Label({
      label: _('Execute on:'),
      halign: Gtk.Align.END,
    });

    this.onBeginEndCombo = new NoScrollComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    this.onBeginEndCombo.append('begin', _('Gesture begin'));
    this.onBeginEndCombo.append('end', _('Gesture end'));
    this.onBeginEndCombo.active_id = gesture?.actionSettings?.on ?? 'begin';

    // Changed signal
    this.buttonCombo.connect('changed', () => this.emit('changed'));
    this.onBeginEndCombo.connect('changed', () => this.emit('changed'));

    // Layout
    this.attach(buttonLabel, 0, 0, 1, 1);
    this.attach(this.buttonCombo, 1, 0, 1, 1);
    this.attach(onBeginEndLabel, 0, 1, 1, 1);
    this.attach(this.onBeginEndCombo, 1, 1, 1, 1);
  }

  getSettings() {
    return {
      button: this.buttonCombo.active_id,
      on: this.onBeginEndCombo.active_id,
    };
  }
}

export default GObject.registerClass(
  {
    Signals: {
      changed: {},
    },
  },
  MouseClickRowSettings,
);
