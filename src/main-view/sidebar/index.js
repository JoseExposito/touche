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
import SidebarRow from './sidebar-row';
import SidebarHeader from './sidebar-header';
import swipeIcon from './icons/swipe.svg';
import pinchIcon from './icons/pinch.svg';

const { Gtk } = imports.gi;

class Sidebar extends Gtk.Box {
  constructor(initialView) {
    super({ orientation: Gtk.Orientation.VERTICAL });

    // Add the application list inside a scroll window
    const scrolled = new Gtk.ScrolledWindow();
    const list = new Gtk.ListBox();
    list.expand = true;
    list.set_header_func(Sidebar.setHeaders);
    list.add(new SidebarRow(_('main-view-sidebar-swipe'), Gtk.Image.new_from_file(swipeIcon)));
    list.add(new SidebarRow(_('main-view-sidebar-pinch'), Gtk.Image.new_from_file(pinchIcon)));
    scrolled.add(list);

    // Add the footer to allow to add more apps
    const footer = new Gtk.ActionBar();
    const footerLabel = new Gtk.Label({ label: _('main-view-sidebar-footer-text') });

    const addAppButton = Gtk.Button.new_from_icon_name('list-add-symbolic', Gtk.IconSize.BUTTON);
    addAppButton.tooltip_text = _('main-view-sidebar-footer-add-app-tooltip');

    const removeAppButton = Gtk.Button.new_from_icon_name('list-remove-symbolic', Gtk.IconSize.BUTTON);
    removeAppButton.tooltip_text = _('main-view-sidebar-footer-remove-app-tooltip');

    footer.get_style_context().add_class(Gtk.STYLE_CLASS_INLINE_TOOLBAR);
    footerLabel.get_style_context().add_class(Gtk.STYLE_CLASS_HEADER);

    footer.pack_start(footerLabel);
    footer.pack_end(addAppButton);
    footer.pack_end(removeAppButton);

    this.pack_start(scrolled, true, true, 0);
    this.pack_end(footer, false, false, 0);
    this.set_size_request(200, -1);
    this.show_all();
  }

  static setHeaders(row1, row2) {
    if (!row2) {
      row1.set_header(new SidebarHeader(_('main-view-sidebar-gestures-header')));
    }
  }
}

export default Sidebar;
