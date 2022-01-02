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
import GestureList from './gesture-list';
import model from '~/config/model';
import GestureDirection from '~/config/gesture-direction';
import GestureType from '~/config/gesture-type';

const { GObject, Gtk } = imports.gi;

class TapView extends Gtk.ScrolledWindow {
  _init() {
    super._init();
    this.showGestures = this.showGestures.bind(this);

    this.list = new GestureList(_('Only available on touchscreens'));
    const helpLabel = new Gtk.Label({ label: _('Tap gestures are only available on touchscreens. Tapping on a touchpad is not available') });
    helpLabel.margin_bottom = 12;

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.append(this.list);
    this.box.append(helpLabel);

    this.set_child(this.box);
  }

  showGestures(appName) {
    const gestures = [
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 2, appName),
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 3, appName),
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 4, appName),
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 5, appName),
    ];

    log('TapView: Loading tap list');
    this.list.showGestures(gestures);
  }
}

export default GObject.registerClass(TapView);
