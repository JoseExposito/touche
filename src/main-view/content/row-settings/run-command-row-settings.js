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
      column_spacing: 16,
    });

    this.gesture = gesture;
    this.repeatChanged = this.repeatChanged.bind(this);

    // Command label and entry
    const commandLabel = new Gtk.Label({
      label: _('settings-run-command-command'),
      halign: Gtk.Align.END,
    });

    this.commandEntry = new Gtk.Entry({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });

    // Repeat label and switch
    const repeatLabel = new Gtk.Label({
      label: _('settings-run-command-repeat'),
      halign: Gtk.Align.END,
    });

    this.repeatSwitch = new Gtk.Switch({
      halign: Gtk.Align.START,
      valign: Gtk.Align.CENTER,
    });
    const isRepeatActive = (gesture?.actionSettings?.repeat === 'true');
    this.repeatSwitch.active = isRepeatActive;

    // When repeat is false, display the on begin/end combo
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

    // When repeat is true, display the oposite direction command entry
    this.opositeCommandLabel = new Gtk.Label({
      label: _('settings-run-command-oposite-direction-text'),
      halign: Gtk.Align.END,
    });

    this.opositeCommandEntry = new Gtk.Entry({
      hexpand: true,
      valign: Gtk.Align.CENTER,
      placeholder_text: _('settings-run-command-oposite-direction-placeholder'),
    });

    // Signals & Properties
    this.repeatSwitch.connect('state_set', (self, state) => this.repeatChanged(state));

    this.attach(commandLabel, 0, 0, 1, 1);
    this.attach(this.commandEntry, 1, 0, 1, 1);
    this.attach(repeatLabel, 0, 1, 1, 1);
    this.attach(this.repeatSwitch, 1, 1, 1, 1);
    this.repeatChanged(isRepeatActive);
    this.show_all();
  }

  repeatChanged(isRepeatActive) {
    this.remove_row(2);

    if (isRepeatActive) {
      this.attach(this.opositeCommandLabel, 0, 2, 1, 1);
      this.attach(this.opositeCommandEntry, 1, 2, 1, 1);
    } else {
      this.attach(this.onBeginEndLabel, 0, 2, 1, 1);
      this.attach(this.onBeginEndCombo, 1, 2, 1, 1);
    }

    this.show_all();
  }
}

export default GObject.registerClass(RunCommandRowSettings);
