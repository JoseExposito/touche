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
const { GObject, Gtk } = imports.gi;

class RunCommandRowSettings extends Gtk.Grid {
  _init(gesture) {
    super._init({
      row_spacing: 8,
      column_spacing: 8,
    });
    this.gesture = gesture;

    const commandLabel = new Gtk.Label({
      label: _('settings-run-command-command'),
      halign: Gtk.Align.END,
    });

    this.commandText = new Gtk.Entry({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });

    const repeatLabel = new Gtk.Label({
      label: _('settings-run-command-repeat'),
      halign: Gtk.Align.END,
    });

    this.repeatSwitch = new Gtk.Switch({
      halign: Gtk.Align.START,
      valign: Gtk.Align.CENTER,
    });
    this.repeatSwitch.active = (gesture?.actionSettings?.repeat === 'true');

    // When repeat is false
    this.onBeginEndLabel = new Gtk.Label({
      label: _('settings-run-command-on-begin-end-text'),
      halign: Gtk.Align.END,
    });

    this.onBeginEndCombo = new Gtk.ComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    this.onBeginEndCombo.append('begin', _('settings-run-command-on-begin-option'));
    this.onBeginEndCombo.append('end', _('settings-run-command-on-end-option'));
    this.onBeginEndCombo.active_id = gesture?.actionSettings?.on ?? 'begin';

    this.attach(commandLabel, 0, 0, 1, 1);
    this.attach(this.commandText, 1, 0, 1, 1);
    this.attach(repeatLabel, 0, 1, 1, 1);
    this.attach(this.repeatSwitch, 1, 1, 1, 1);
    this.repeatChanged();
    this.show_all();
  }

  repeatChanged() {
    // const active = (this.gesture?.actionSettings?.repeat === 'true');

    // TODO Switch this bit of the UI
    this.attach(this.onBeginEndLabel, 0, 2, 1, 1);
    this.attach(this.onBeginEndCombo, 1, 2, 1, 1);
  }
}

export default GObject.registerClass(RunCommandRowSettings);
