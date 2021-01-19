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
const ActionType = {
  MAXIMIZE_RESTORE_WINDOW: 'MAXIMIZE_RESTORE_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  TILE_WINDOW: 'TILE_WINDOW',
  FULLSCREEN_WINDOW: 'FULLSCREEN_WINDOW',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  CHANGE_DESKTOP: 'CHANGE_DESKTOP',
  SHOW_DESKTOP: 'SHOW_DESKTOP',
  SEND_KEYS: 'SEND_KEYS',
  RUN_COMMAND: 'RUN_COMMAND',
  MOUSE_CLICK: 'MOUSE_CLICK',
};

export const actionTypeText = (actionType) => {
  switch (actionType) {
    case ActionType.MAXIMIZE_RESTORE_WINDOW:
      return _('Maximize or restore a window');
    case ActionType.MINIMIZE_WINDOW:
      return _('Minimize a window');
    case ActionType.TILE_WINDOW:
      return _('Tile a widow');
    case ActionType.FULLSCREEN_WINDOW:
      return _('Toggle fullscreen mode');
    case ActionType.CLOSE_WINDOW:
      return _('Close a window');
    case ActionType.CHANGE_DESKTOP:
      return _('Switch desktop');
    case ActionType.SHOW_DESKTOP:
      return _('Show desktop');
    case ActionType.SEND_KEYS:
      return _('Keyboard shortcut');
    case ActionType.RUN_COMMAND:
      return _('Execute a command');
    case ActionType.MOUSE_CLICK:
      return _('Mouse click');
    default:
      return _('Unknown action');
  }
};
export default ActionType;
