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
import model from '~/config/model';
import GestureDirection from '~/config/gesture-direction';
import GestureType from '~/config/gesture-type';
import GestureList from './gesture-list';

const { GObject, Gtk } = imports.gi;

class PinchView extends Gtk.ScrolledWindow {
  _init() {
    super._init();
    this.showGestures = this.showGestures.bind(this);

    const title = _('Pinch with %d fingers');
    this.list2 = new GestureList(title.format(2));
    this.list3 = new GestureList(title.format(3));
    this.list4 = new GestureList(title.format(4));
    this.list5 = new GestureList(title.format(5));

    this.box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box.append(this.list2);
    this.box.append(this.list3);
    this.box.append(this.list4);

    this.expander = new Gtk.Expander({ label: _('Only available on touchscreens') });
    this.expander.add_css_class('expander-block');

    this.box2 = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.box2.append(this.list5);

    this.expander.set_child(this.box2);
    this.box.append(this.expander);

    this.set_child(this.box);
  }

  showGestures(appName) {
    const gestures2 = [
      model.getGesture(GestureType.PINCH, GestureDirection.IN, 2, appName),
      model.getGesture(GestureType.PINCH, GestureDirection.OUT, 2, appName),
    ];

    const gestures3 = [
      model.getGesture(GestureType.PINCH, GestureDirection.IN, 3, appName),
      model.getGesture(GestureType.PINCH, GestureDirection.OUT, 3, appName),
    ];

    const gestures4 = [
      model.getGesture(GestureType.PINCH, GestureDirection.IN, 4, appName),
      model.getGesture(GestureType.PINCH, GestureDirection.OUT, 4, appName),
    ];

    const gestures5 = [
      model.getGesture(GestureType.PINCH, GestureDirection.IN, 5, appName),
      model.getGesture(GestureType.PINCH, GestureDirection.OUT, 5, appName),
    ];

    log('PinchView: Loading 3 fingers pinch');
    this.list2.showGestures(gestures2);

    log('PinchView: Loading 3 fingers pinch');
    this.list3.showGestures(gestures3);

    log('PinchView: Loading 4 fingers pinch');
    this.list4.showGestures(gestures4);

    log('PinchView: Loading 5 fingers pinch');
    this.list5.showGestures(gestures5);
  }
}

export default GObject.registerClass(PinchView);
