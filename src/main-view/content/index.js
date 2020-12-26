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
import Views from '../views';
import SwipeView from './swipe-view';
import PinchView from './pinch-view';
import TapView from './tap-view';

const { GObject, Gtk } = imports.gi;

class Content extends Gtk.Box {
  _init(initialView) {
    super._init({ orientation: Gtk.Orientation.VERTICAL });

    // Stack
    this.stack = new Gtk.Stack();
    this.stack.add_titled(new SwipeView(), Views.SWIPE_VIEW, _('Swipe'));
    this.stack.add_titled(new PinchView(), Views.PINCH_VIEW, _('Pinch'));
    this.stack.add_titled(new TapView(), Views.TAP_VIEW, _('Tap'));

    this.stack.transition_type = Gtk.StackTransitionType.SLIDE_LEFT_RIGHT;
    this.stack.visible_child_name = initialView;
    this.stack.margin_start = 12;
    this.stack.margin_end = 12;

    // Stack Switcher
    this.stackSwitcher = new Gtk.StackSwitcher();
    this.stackSwitcher.stack = this.stack;
    this.stackSwitcher.halign = Gtk.Align.CENTER;
    this.stackSwitcher.homogeneous = true;

    // Layout
    this.pack_start(this.stackSwitcher, false, false, 12);
    this.pack_end(this.stack, true, true, 0);
    this.set_size_request(200, -1);
    this.show_all();
  }
}

export default GObject.registerClass(Content);
