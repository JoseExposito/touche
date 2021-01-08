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
import ActionType, { actionTypeText } from '~/config/action-type';
import { gestureDirectionText } from '~/config/gesture-direction';
import rowSettings from './row-settings';

const { GObject, Gtk } = imports.gi;

class GestureListRow extends Gtk.ListBoxRow {
  _init(gesture) {
    super._init();
    this.gesture = gesture;
    this.setRowSettings = this.setRowSettings.bind(this);

    this.grid = new Gtk.Grid({
      margin: 8,
      margin_bottom: 16,
      row_spacing: 8,
    });

    // Direction label
    const directionLabel = new Gtk.Label({
      label: gestureDirectionText(gesture.gestureDirection),
      halign: Gtk.Align.START,
      valign: Gtk.Align.CENTER,
    });
    const directionClass = Granite ? Granite.STYLE_CLASS_H3_LABEL : 'text-h3';
    directionLabel.get_style_context().add_class(directionClass);

    // Enabled switch
    this.enabledSwitch = new Gtk.Switch({
      halign: Gtk.Align.END,
      valign: Gtk.Align.CENTER,
    });
    this.enabledSwitch.active = gesture.enabled;

    // Actions combo box
    this.actionsCombo = new Gtk.ComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    Object.values(ActionType).forEach((action) => {
      this.actionsCombo.append(action, actionTypeText(action));
    });

    if (gesture.enabled) {
      this.actionsCombo.active_id = gesture.actionType;
    }

    this.actionsCombo.connect('scroll_event', () => {
      GObject.signal_stop_emission_by_name(this.actionsCombo, 'scroll-event');
    });

    this.actionsCombo.connect('changed', () => {
      const action = ActionType[this.actionsCombo.active_id];
      log(`Actions ComboBoxText: Selected action ${action}`);
      this.gesture.actionType = action;
      this.setRowSettings();
    });

    // Row settings
    this.setRowSettings();

    // Signals & Properties
    this.enabledSwitch.bind_property('active', this.actionsCombo, 'sensitive', GObject.BindingFlags.SYNC_CREATE);

    // Layout
    this.grid.attach(directionLabel, 0, 0, 1, 1);
    this.grid.attach(this.enabledSwitch, 1, 0, 1, 1);
    this.grid.attach(this.actionsCombo, 0, 1, 2, 1);
    this.grid.show_all();

    this.add(this.grid);
  }

  /**
   * Set the row advanced settings if the selected action has any.
   */
  setRowSettings() {
    this.grid.remove_row(3);
    this.grid.remove_row(2);

    this.rowSettings = rowSettings[this.gesture.actionType]
      ? new rowSettings[this.gesture.actionType](this.gesture)
      : null;

    if (this.rowSettings) {
      this.rowSettings.margin_top = 8;
      this.grid.attach(this.rowSettings, 0, 2, 2, 1);

      this.enabledSwitch.bind_property('active', this.rowSettings, 'sensitive', GObject.BindingFlags.SYNC_CREATE);
    }
    this.grid.show_all();
  }
}

export default GObject.registerClass(GestureListRow);
