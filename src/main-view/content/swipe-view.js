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

class SwipeView extends Gtk.ScrolledWindow {
  _init() {
    super._init();
    this.showGestures = this.showGestures.bind(this);

    const title = _('Swipe with %d fingers');
    this.list2 = new GestureList(title.format(2));
    this.list3 = new GestureList(title.format(3));
    this.list4 = new GestureList(title.format(4));
    this.list5 = new GestureList(title.format(5));

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.append(this.list3);
    this.box.append(this.list4);

    this.expander = new Gtk.Expander({ label: _('Only available on touchscreens') });
    this.expander.add_css_class('expander-block');

    this.box2 = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box2.append(this.list2);
    this.box2.append(this.list5);

    this.expander.set_child(this.box2);
    this.box.append(this.expander);

    this.set_child(this.box);
  }

  showGestures(appName) {
    const gestures2 = [
      model.getGesture(GestureType.SWIPE, GestureDirection.UP, 2, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.DOWN, 2, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.LEFT, 2, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.RIGHT, 2, appName),
    ];

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

    const gestures5 = [
      model.getGesture(GestureType.SWIPE, GestureDirection.UP, 5, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.DOWN, 5, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.LEFT, 5, appName),
      model.getGesture(GestureType.SWIPE, GestureDirection.RIGHT, 5, appName),
    ];

    log('SwipeView: Loading 2 fingers swipes');
    this.list2.showGestures(gestures2);

    log('SwipeView: Loading 3 fingers swipes');
    this.list3.showGestures(gestures3);

    log('SwipeView: Loading 4 fingers swipes');
    this.list4.showGestures(gestures4);

    log('SwipeView: Loading 5 fingers swipes');
    this.list5.showGestures(gestures5);
  }
}

export default GObject.registerClass(SwipeView);
