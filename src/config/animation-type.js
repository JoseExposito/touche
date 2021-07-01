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
const AnimationType = {
  NONE: 'NONE',
  CHANGE_DESKTOP_UP: 'CHANGE_DESKTOP_UP',
  CHANGE_DESKTOP_DOWN: 'CHANGE_DESKTOP_DOWN',
  CHANGE_DESKTOP_LEFT: 'CHANGE_DESKTOP_LEFT',
  CHANGE_DESKTOP_RIGHT: 'CHANGE_DESKTOP_RIGHT',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  MAXIMIZE_WINDOW: 'MAXIMIZE_WINDOW',
  RESTORE_WINDOW: 'RESTORE_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  SHOW_DESKTOP: 'SHOW_DESKTOP',
  EXIST_SHOW_DESKTOP: 'EXIST_SHOW_DESKTOP',
  TILE_WINDOW_LEFT: 'TILE_WINDOW_LEFT',
  TILE_WINDOW_RIGHT: 'TILE_WINDOW_RIGHT',
};

export const animationTypeText = (animationType) => {
  switch (animationType) {
    case AnimationType.CHANGE_DESKTOP_UP:
      return _('Arrow up');
    case AnimationType.CHANGE_DESKTOP_DOWN:
      return _('Arrow down');
    case AnimationType.CHANGE_DESKTOP_LEFT:
      return _('Arrow left');
    case AnimationType.CHANGE_DESKTOP_RIGHT:
      return _('Arrow right');
    case AnimationType.CLOSE_WINDOW:
      return _('Close a window');
    case AnimationType.MAXIMIZE_WINDOW:
      return _('Maximize a window');
    case AnimationType.RESTORE_WINDOW:
      return _('Restore a window');
    case AnimationType.MINIMIZE_WINDOW:
      return _('Minimize a window');
    case AnimationType.SHOW_DESKTOP:
      return _('Show desktop');
    case AnimationType.EXIST_SHOW_DESKTOP:
      return _('Hide desktop');
    case AnimationType.TILE_WINDOW_LEFT:
      return _('Tile window to the left half of the screen');
    case AnimationType.TILE_WINDOW_RIGHT:
      return _('Tile window to the right half of the screen');
    case AnimationType.NONE:
    default:
      return _('Without animation');
  }
};

export default AnimationType;
