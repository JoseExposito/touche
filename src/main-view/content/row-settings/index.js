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
import ActionType from '~/config/action-type';
import SendKeysRowSettings from './send-keys-row-settings';
import RunCommandRowSettings from './run-command-row-settings';
import MouseClickRowSettings from './mouse-click-row-settings';
import TileWindowRowSettings from './tile-window-row-settings';

export default {
  [ActionType.SEND_KEYS]: SendKeysRowSettings,
  [ActionType.RUN_COMMAND]: RunCommandRowSettings,
  [ActionType.MOUSE_CLICK]: MouseClickRowSettings,
  [ActionType.TILE_WINDOW]: TileWindowRowSettings,
};
