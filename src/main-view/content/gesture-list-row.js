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
import ActionType, { actionTypeText } from '~/config/action-type';
import { gestureDirectionText } from '~/config/gesture-direction';
import GestureType from '~/config/gesture-type';
import NoScrollComboBoxText from '~/utils/no-scroll-combo-box-text';
import rowSettings from './row-settings';

const { GObject, Gtk } = imports.gi;

class GestureListRow extends Gtk.ListBoxRow {
  _init(gesture) {
    super._init();
    this.gesture = gesture;
    this.setRowSettings = this.setRowSettings.bind(this);
    this.saveSettings = this.saveSettings.bind(this);

    this.grid = new Gtk.Grid({
      margin: 8,
      margin_bottom: 16,
      row_spacing: 8,
    });

    // Title label
    const titleText = (gesture.gestureType === GestureType.TAP)
      ? _('Tap with %d fingers').format(gesture.numberOfFingers)
      : gestureDirectionText(gesture.gestureDirection);
    const titleLabel = new Gtk.Label({
      label: titleText,
      halign: Gtk.Align.START,
      valign: Gtk.Align.CENTER,
    });
    const titleClass = Granite ? Granite.STYLE_CLASS_H3_LABEL : 'text-h3';
    titleLabel.get_style_context().add_class(titleClass);

    // Enabled switch
    this.enabledSwitch = new Gtk.Switch({
      halign: Gtk.Align.END,
      valign: Gtk.Align.CENTER,
    });
    this.enabledSwitch.active = gesture.enabled;

    // Actions combo box
    this.actionsCombo = new NoScrollComboBoxText({
      hexpand: true,
      valign: Gtk.Align.CENTER,
    });
    Object.values(ActionType).forEach((action) => {
      this.actionsCombo.append(action, actionTypeText(action));
    });

    if (gesture.enabled) {
      // TODO Handle disabled gestures
      this.actionsCombo.active_id = gesture.actionType;
    }

    // Row settings
    this.setRowSettings();

    // Signals & Properties
    this.actionsCombo.connect('changed', () => {
      this.gesture.actionType = ActionType[this.actionsCombo.active_id];
      this.setRowSettings();
      this.saveSettings();
    });

    this.enabledSwitch.connect('state-set', () => {
      this.gesture.enabled = this.enabledSwitch.get_active();
      this.saveSettings();
    });

    this.enabledSwitch.bind_property('active', this.actionsCombo, 'sensitive', GObject.BindingFlags.SYNC_CREATE);

    // Layout
    this.grid.attach(titleLabel, 0, 0, 1, 1);
    this.grid.attach(this.enabledSwitch, 1, 0, 1, 1);
    this.grid.attach(this.actionsCombo, 0, 1, 2, 1);
    this.grid.show_all();

    this.add(this.grid);
  }

  /**
   * Set the row advanced settings if the selected action has any.
   */
  setRowSettings() {
    log('Updating row settings');
    this.grid.remove_row(3);
    this.grid.remove_row(2);

    if (this.rowSettings) {
      this.rowSettings.disconnect(this.rowSettingsSignalId);
    }

    const hasRowSettings = rowSettings[this.gesture.actionType];
    log(`Action with type ${this.gesture.actionType} ${hasRowSettings ? 'has extra settings' : 'does NOT have extra settings'}`);

    if (!hasRowSettings) {
      this.rowSettings = null;
    } else {
      this.rowSettings = new rowSettings[this.gesture.actionType](this.gesture);
      this.rowSettings.margin_top = 8;
      this.grid.attach(this.rowSettings, 0, 2, 2, 1);

      this.enabledSwitch.bind_property('active', this.rowSettings, 'sensitive', GObject.BindingFlags.SYNC_CREATE);

      this.rowSettingsSignalId = this.rowSettings.connect('changed', this.saveSettings);
    }

    this.grid.show_all();
  }

  saveSettings() {
    log(`Updating gesture with ID ${this.gesture.id}`);

    model.removeGesture(this.gesture);

    log(`Gesture enabled: ${this.gesture.enabled}`);
    log(`Gesture action: ${this.gesture.actionType}`);

    // Exit if no action is selected yet
    if (!this.gesture.actionType) {
      return;
    }

    if (this.rowSettings) {
      this.gesture.actionSettings = this.rowSettings.getSettings();
      log(`Gesture extra settings: ${JSON.stringify(this.gesture.actionSettings, null, 2)}`);
    } else {
      this.gesture.actionSettings = null;
    }

    model.addGesture(this.gesture);
    model.saveToFile();
  }
}

export default GObject.registerClass(GestureListRow);
