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
import Views from '../views';
import SwipeView from './swipe-view';
import PinchView from './pinch-view';
import TapView from './tap-view';

const { Adw, GObject, Gtk } = imports.gi;

class Content extends Adw.NavigationPage {
  _init() {
    super._init();
    this.appSelected = this.appSelected.bind(this);

    // Stack
    this.swipeView = new SwipeView();
    this.pinchView = new PinchView();
    this.tapView = new TapView();

    this.stack = new Gtk.Stack();
    this.stack.add_titled(this.swipeView, Views.SWIPE_VIEW, _('Swipe'));
    this.stack.add_titled(this.pinchView, Views.PINCH_VIEW, _('Pinch'));
    this.stack.add_titled(this.tapView, Views.TAP_VIEW, _('Tap'));
    this.stack.transition_type = Gtk.StackTransitionType.SLIDE_LEFT_RIGHT;
    this.stack.vexpand = true;

    // Stack Switcher
    this.stackSwitcher = new Gtk.StackSwitcher();
    this.stackSwitcher.stack = this.stack;
    this.stackSwitcher.halign = Gtk.Align.CENTER;
    this.stackSwitcher.homogeneous = true;

    // Header
    const header = new Adw.HeaderBar();
    header.set_decoration_layout(':close');
    header.set_title_widget(this.stackSwitcher);

    // Layout
    this.toolbar = new Adw.ToolbarView();
    this.toolbar.add_top_bar(header);
    this.toolbar.set_content(this.stack);
    this.set_child(this.toolbar);
  }

  appSelected(appName) {
    log(`MainView Content: Loading gestures for app with name: "${appName}"`);
    this.swipeView.showGestures(appName);
    this.pinchView.showGestures(appName);
    this.tapView.showGestures(appName);
  }
}

export default GObject.registerClass(Content);
