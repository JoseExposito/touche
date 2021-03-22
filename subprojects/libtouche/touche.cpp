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
#include "touche.h"

#include <X11/X.h>
#include <X11/Xatom.h>
#include <X11/Xlib.h>
#include <X11/Xutil.h>

#include <algorithm>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

static Display *display = XOpenDisplay(nullptr);

template <typename T>
std::vector<T> getWindowProperty(Window window, const std::string &atomName, Atom atomType) {
  std::vector<T> propertiesVector;

  Atom atom = XInternAtom(display, atomName.c_str(), True);
  if (atom == None) {
    return propertiesVector;
  }

  long offset = 0;
  long offsetSize = 100;
  Atom atomRet = None;
  int size = 0;
  unsigned long numItems = 0;
  unsigned long bytesAfterReturn = 0;
  unsigned char *ret = nullptr;
  int status = 0;

  do {
    status = XGetWindowProperty(display, window, atom, offset, offsetSize,
                                False, atomType, &atomRet, &size, &numItems,
                                &bytesAfterReturn, &ret);
    if (status == Success) {
      auto properties = reinterpret_cast<T *>(ret);
      for (unsigned long i = 0; i < numItems; i++) {
        propertiesVector.push_back(properties[i]);
      }
      XFree(ret);
      offset += offsetSize;
    }
  } while (status == Success && bytesAfterReturn != 0 && numItems != 0);

  return propertiesVector;
}

std::pair<bool, Window> findTopLevelWindowInChildren(Window window, const std::vector<Window> &topLevelWindows) {
  // If "window" is in the "topLevelWindows" return it
  if (std::find(topLevelWindows.begin(), topLevelWindows.end(), window) !=
      topLevelWindows.end()) {
    return std::make_pair(true, window);
  }

  // Otherwise, find the top level window in the "window" children
  Window root = None;
  Window parent = None;
  Window *children = nullptr;
  unsigned int numChildren = 0;

  int status = XQueryTree(display, window, &root, &parent, &children,
                          &numChildren);
  if (status == 0) {
    return std::make_pair(true, None);
  }

  Window ret = None;
  bool found = false;
  unsigned int index = 0;
  while (!found && index < numChildren) {
    auto pair = findTopLevelWindowInChildren(children[index], topLevelWindows);
    found = pair.first;
    ret = pair.second;
    index++;
  }

  if (children != nullptr) {
    XFree(children);
  }

  return std::make_pair(found, ret);
}

Window getTopLevelWindow(Window window) {
  // Get the list of top-level windows from the atom stored in the root window
  std::vector<Window> topLevelWindows = getWindowProperty<Window>(
      XDefaultRootWindow(display), "_NET_CLIENT_LIST", XA_WINDOW);

  // Figure out to which top-level window "window" belongs to
  auto pair = findTopLevelWindowInChildren(window, topLevelWindows);
  Window topLevelWindow = pair.second;
  return topLevelWindow;
}

Window getWindowUnderCursor() {
  Window rootWindow = None;
  Window childWindow = None;
  int rootX = 0;
  int rootY = 0;
  int childX = 0;
  int childY = 0;
  unsigned int mask = 0;
  int success = XQueryPointer(display, XDefaultRootWindow(display),
                              &rootWindow, &childWindow, &rootX, &rootY,
                              &childX, &childY, &mask);

  if (success == True && childWindow == None) {
    return rootWindow;
  }

  Window topLevelWindow = getTopLevelWindow(childWindow);
  return topLevelWindow;
}

std::string getWindowClassName(Window window) {
  std::string className;

  XClassHint *classHint = XAllocClassHint();
  int status = XGetClassHint(display, window, classHint);

  if (status == 0) {
    return className;
  }

  if (classHint->res_class != nullptr) {
    className = classHint->res_class;
    XFree(classHint->res_class);
  }

  if (classHint->res_name != nullptr) {
    XFree(classHint->res_name);
  }

  XFree(classHint);
  return className;
}

GString *touche_get_window_under_cursor_class_name() {
  Window window = getWindowUnderCursor();
  std::string className = getWindowClassName(window);
  return g_string_new(className.c_str());
}
