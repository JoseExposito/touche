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
#ifndef TOUCHE_H_
#define TOUCHE_H_

#include <glib.h>
#include <glib-object.h>

G_BEGIN_DECLS

GString *touche_get_window_under_cursor_class_name();

gboolean touche_grab_pointer(unsigned long xid);
GList *touche_grab_keyboard(unsigned long xid);
void touche_ungrab();

G_END_DECLS

#endif // TOUCHE_H_
