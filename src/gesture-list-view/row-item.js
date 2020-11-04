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
import GestureType from '~/config/gesture-type';
import GestureDirection from '~/config/gesture-direction';
import ActionType from '~/config/action-type';

const { Gtk } = imports.gi;

class RowItem extends Gtk.HBox {
  static TYPE = {
    PLUS: 'plus',
    EQUAL: 'equal',
    GESTURE_TYPE: 'gesture-type',
    GESTURE_DIRECTION: 'gesture-direction',
    NUMBER_OF_FINGERS: 'number-of-fingers',
    ACTION_TYPE: 'action-type',
  }

  constructor(type, value = null) {
    super();
    this.get_style_context().add_class('row-item');
    this.get_style_context().add_class(`row-item-${type}`);

    // const image = Gtk.Image.new_from_icon_name('bluetooth', Gtk.IconSize.DND);
    const label = new Gtk.Label({ label: RowItem.getText(type, value) });
    // this.add(image);
    this.add(label);
    this.show_all();
  }

  // getIcon() {

  // }

  static getText(type, value) {
    if (type === RowItem.TYPE.PLUS) {
      return '+';
    }

    if (type === RowItem.TYPE.EQUAL) {
      return '=';
    }

    if (type === RowItem.TYPE.NUMBER_OF_FINGERS) {
      return value;
    }

    switch (value) {
      case GestureType.SWIPE:
        return _('gesture-list-gesture-type-swipe');
      case GestureType.PINCH:
        return _('gesture-list-gesture-type-pinch');

      case GestureDirection.UP:
        return _('gesture-list-direction-up');
      case GestureDirection.DOWN:
        return _('gesture-list-direction-down');
      case GestureDirection.LEFT:
        return _('gesture-list-direction-left');
      case GestureDirection.RIGHT:
        return _('gesture-list-direction-right');
      case GestureDirection.IN:
        return _('gesture-list-direction-in');
      case GestureDirection.OUT:
        return _('gesture-list-direction-out');

      case ActionType.MAXIMIZE_RESTORE_WINDOW:
        return _('gesture-list-action-maximize-restore-window');
      case ActionType.MINIMIZE_WINDOW:
        return _('gesture-list-action-minimize-window');
      case ActionType.TILE_WINDOW:
        return _('gesture-list-action-tile-window');
      case ActionType.CLOSE_WINDOW:
        return _('gesture-list-action-close-window');
      case ActionType.CHANGE_DESKTOP:
        return _('gesture-list-action-change-desktop');
      case ActionType.SHOW_DESKTOP:
        return _('gesture-list-action-show-desktop');
      case ActionType.SEND_KEYS:
        return _('gesture-list-action-send-keys');
      case ActionType.RUN_COMMAND:
        return _('gesture-list-action-run-command');

      default:
        // TODO Handle this error
        throw new Error('Unknown gesture list row text value');
    }
  }
}

export default RowItem;
