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
import AppWindow from '~/app-window';

pkg.initGettext();
pkg.initFormat();

pkg.require({
  Gio: '2.0',
  Gtk: '3.0',
});

const { Gio, Gtk } = imports.gi;

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
  log(argv);

  const application = new Gtk.Application({
    application_id: process.env.PROJECT_NAME,
    flags: Gio.ApplicationFlags.FLAGS_NONE,
  });

  application.connect('activate', (app) => {
    let { activeWindow } = app;

    if (!activeWindow) {
      activeWindow = new AppWindow(app);
    }

    activeWindow.present();
  });

  return application.run(argv);
}

imports[process.env.PROJECT_NAME].main = main;
