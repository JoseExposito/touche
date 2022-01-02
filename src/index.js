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
import './pkg-init';
// The pkg-init ^ import must be the first import
import AppWindow from '~/app-window';

const {
  Adw,
  Gio,
  Gtk,
  Gdk,
} = imports.gi;

/**
 * Application  entry point.
 *
 * @param {Array<string>}argv Command line params.
 * @returns {number} Status code.
 */
function main(argv) {
  const application = Adw.Application.new(
    process.env.PROJECT_NAME,
    Gio.ApplicationFlags.FLAGS_NONE,
  );

  application.connect('activate', (app) => {
    // Load global CSS
    const provider = new Gtk.CssProvider();
    provider.load_from_resource(`${process.env.PROJECT_NAME.split('.').join('/')}/assets/global.css`);
    Gtk.StyleContext.add_provider_for_display(Gdk.Display.get_default(), provider,
      Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);

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
