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
import GestureList from './gesture-list';
import model from '~/config/model';
import GestureDirection from '~/config/gesture-direction';
import GestureType from '~/config/gesture-type';

const { GObject, Gtk } = imports.gi;

class TapView extends Gtk.ScrolledWindow {
  _init() {
    super._init();
    this.showGestures = this.showGestures.bind(this);

    this.list2 = new GestureList(_('Tap with 2 fingers'));
    this.list3 = new GestureList(_('Tap with 3 fingers'));
    this.list4 = new GestureList(_('Tap with 4 fingers'));
    const helpLabel = new Gtk.Label({ label: _('Tap gestures are only available on touchscreens. Tapping on a touchpad is not available') });

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.add(this.list2);
    this.box.add(this.list3);
    this.box.add(this.list4);
    this.box.add(helpLabel);
    this.box.margin_start = 12;
    this.box.margin_end = 12;
    this.box.margin_bottom = 12;
    this.box.show_all();

    this.add(this.box);
  }

  showGestures(appName) {
    const gestures2 = [
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 2, appName),
    ];

    const gestures3 = [
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 3, appName),
    ];

    const gestures4 = [
      model.getGesture(GestureType.TAP, GestureDirection.UNKNOWN, 4, appName),
    ];

    log('TapView: Loading 2 fingers tap');
    this.list2.showGestures(gestures2);

    log('TapView: Loading 3 fingers tap');
    this.list3.showGestures(gestures3);

    log('TapView: Loading 4 fingers tap');
    this.list4.showGestures(gestures4);
  }
}

export default GObject.registerClass(TapView);
