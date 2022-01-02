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
const {
  Adw,
  GObject,
  Gtk,
  Gdk,
} = imports.gi;

/**
 * When Touchégg is not installed, this view is displayed to allow to download it.
 */
class NotInstalledView extends Gtk.Box {
  _init() {
    super._init({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 12,
    });

    const header = new Adw.HeaderBar();
    header.set_decoration_layout(':close');
    header.set_title_widget(new Gtk.Label({ label: '' }));
    header.add_css_class('flat');

    const title = new Gtk.Label({
      label: _('Touchégg is not installed'),
      hexpand: true,
      vexpand: true,
    });
    title.add_css_class('text-h2');

    const description = new Gtk.Label({
      label: _('It looks like Touchégg is not installed, let\'s start by downloading it'),
      hexpand: true,
    });
    description.add_css_class('text-h3');

    const download = new Gtk.Button({
      label: _('Download Touchégg'),
      hexpand: false,
      halign: Gtk.Align.CENTER,
      valign: Gtk.Align.CENTER,
      margin_top: 12,
    });
    download.add_css_class('suggested-action');
    download.add_css_class('download-button');
    download.connect('clicked', () => Gtk.show_uri_full(
      null,
      'https://github.com/JoseExposito/touchegg#readme',
      Gdk.CURRENT_TIME,
      null,
      null,
    ));

    const installed = new Gtk.LinkButton({
      label: _('I just installed it'),
      halign: Gtk.Align.CENTER,
      valign: Gtk.Align.CENTER,
      vexpand: true,
    });
    installed.connect('activate-link', () => {
      this.emit('installed');
      return true;
    });

    this.append(header);
    this.append(title);
    this.append(description);
    this.append(download);
    this.append(installed);
  }
}

export default GObject.registerClass(
  {
    Signals: {
      installed: {},
    },
  },
  NotInstalledView,
);
