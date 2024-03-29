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
import NoScrollComboBoxText from '~/utils/no-scroll-combo-box-text';
import AnimationType, { animationTypeText } from '~/config/animation-type';

const { GObject } = imports.gi;

/**
 * Gtk.ComboBoxText that allows to select a custom animation.
 */
class AnimationComboBoxText extends NoScrollComboBoxText {
  _init(props) {
    super._init(props);

    Object.values(AnimationType).forEach((action) => {
      this.append(action, animationTypeText(action));
    });
  }

  setAnimationType(animation) {
    this.active_id = animation ?? AnimationType.NONE;
  }

  getAnimationType() {
    return AnimationType[this.active_id];
  }
}

export default GObject.registerClass(AnimationComboBoxText);
