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
import AppWindow from '~/app-window';

pkg.initGettext();
pkg.initFormat();

pkg.require({
  Gio: '2.0',
  Gtk: '3.0',
  Gdk: '3.0',
  Wnck: '3.0',
});

const { Gio, Gtk, Gdk } = imports.gi;

// Import Granite if it is available
try {
  const { Granite } = imports.gi;
  window.Granite = Granite;
} catch (error) {
  log('Granite is not available');
  window.Granite = null;
}

/**
 * Application  entry point.
 *
 * @param {Array<string>}argv Command line params.
 * @returns {number} Status code.
 */
function main(argv) {
  const application = new Gtk.Application({
    application_id: process.env.PROJECT_NAME,
    flags: Gio.ApplicationFlags.FLAGS_NONE,
  });

  application.connect('activate', (app) => {
    // Load global CSS
    const provider = new Gtk.CssProvider();
    provider.load_from_resource(`${process.env.PROJECT_NAME.split('.').join('/')}/assets/global.css`);
    Gtk.StyleContext.add_provider_for_screen(Gdk.Screen.get_default(), provider,
      Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);

    // Allow to use dark style on elementary OS
    if (Granite) {
      log('Granite is available, setting up dark style');
      const graniteSettings = Granite.Settings.get_default();
      const gtkSettings = Gtk.Settings.get_default();

      const setColorSchema = () => {
        const useDark = (graniteSettings.prefers_color_scheme === Granite.SettingsColorScheme.DARK);
        gtkSettings.gtk_application_prefer_dark_theme = useDark;
      };

      graniteSettings.connect('notify::prefers-color-scheme', setColorSchema);
      setColorSchema();
    }

    // Show the app window
    let { activeWindow } = app;

    if (!activeWindow) {
      activeWindow = new AppWindow(app);
    }

    activeWindow.present();
  });

  return application.run(argv);
}

imports[process.env.PROJECT_NAME].main = main;
