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
import GestureList from './gesture-list';
import model from '~/config/model';
import GestureDirection from '~/config/gesture-direction';
import GestureType from '~/config/gesture-type';

const { GObject, Gtk } = imports.gi;

class SwipeView extends Gtk.ScrolledWindow {
  _init() {
    super._init();
    this.showGestures = this.showGestures.bind(this);

    const title = _('Swipe with %d fingers');
    this.list3 = new GestureList(title.format(3));
    this.list4 = new GestureList(title.format(4));

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.add(this.list3);
    this.box.add(this.list4);
    this.box.margin_start = 12;
    this.box.margin_end = 12;
    this.box.show_all();

    this.add(this.box);
  }

  showGestures(appName) {
    const gestures3 = [
      model.getGesture(GestureType.SWIPE, GestureDirection.UP, 3, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.DOWN, 3, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.LEFT, 3, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.RIGHT, 3, appName),
    ];

    const gestures4 = [
      model.getGesture(GestureType.SWIPE, GestureDirection.UP, 4, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.DOWN, 4, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.LEFT, 4, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.RIGHT, 4, appName),
    ];

    log('SwipeView: Loading 3 fingers swipes');
    this.list3.showGestures(gestures3);

    log('SwipeView: Loading 4 fingers swipes');
    this.list4.showGestures(gestures4);
  }
}

export default GObject.registerClass(SwipeView);
