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
const { GObject, Gtk, Gdk } = imports.gi;

/**
 * When Touchégg is not installed, this view is displayed to allow to download it.
 */
class NotInstalledView extends Gtk.Box {
  _init() {
    super._init({
      orientation: Gtk.Orientation.VERTICAL,
      spacing: 12,
      margin: 24,
    });

    const title = new Gtk.Label({ label: _('Touchégg is not installed'), hexpand: true });
    const titleClass = Granite ? Granite.STYLE_CLASS_H2_LABEL : 'text-h2';
    title.get_style_context().add_class(titleClass);

    const explanation = new Gtk.Label({
      label: _('It looks like Touchégg is not installed, let\'s start by downloading it'),
      hexpand: true,
    });
    const explanationClass = Granite ? Granite.STYLE_CLASS_H3_LABEL : 'text-h3';
    explanation.get_style_context().add_class(explanationClass);

    const download = new Gtk.Button({
      label: _('Download Touchégg'),
      hexpand: false,
      halign: Gtk.Align.CENTER,
      valign: Gtk.Align.CENTER,
      margin_top: 12,
    });
    download.get_style_context().add_class(Gtk.STYLE_CLASS_SUGGESTED_ACTION);
    download.get_style_context().add_class('download-button');
    download.connect('clicked', () => Gtk.show_uri_on_window(
      null,
      'https://github.com/JoseExposito/touchegg/releases',
      Gdk.CURRENT_TIME,
    ));

    const installed = new Gtk.LinkButton({
      label: _('I just installed it'),
      halign: Gtk.Align.CENTER,
      valign: Gtk.Align.CENTER,
    });
    installed.connect('activate-link', () => {
      this.emit('installed');
      return true;
    });

    this.pack_start(title, false, false, 0);
    this.pack_start(explanation, false, false, 0);
    this.pack_start(download, true, true, 0);
    this.pack_end(installed, false, false, 0);
    this.show_all();
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
