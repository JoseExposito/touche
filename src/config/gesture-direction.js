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
const GestureDirection = {
  UNKNOWN: 'UNKNOWN',

  // GestureType.SWIPE
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',

  // GestureType.PINCH
  IN: 'IN',
  OUT: 'OUT',
};

export const gestureDirectionText = (gestureDirection) => {
  switch (gestureDirection) {
    case GestureDirection.UP:
      return _('Up');
    case GestureDirection.DOWN:
      return _('Down');
    case GestureDirection.LEFT:
      return _('Left');
    case GestureDirection.RIGHT:
      return _('Right');
    case GestureDirection.IN:
      return _('In');
    case GestureDirection.OUT:
      return _('Out');
    case GestureDirection.UNKNOWN:
    default:
      return _('Unknown');
  }
};

export default GestureDirection;
