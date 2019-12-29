/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { StyleSheet, ViewStyle } from 'react-native';

import { config } from '../../constants/config';

export interface CategoryDetailScreenStyles {
  screen: ViewStyle;
  floating_button_container: ViewStyle;
}

export const baseStyles: CategoryDetailScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  floating_button_container: {
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
});

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    screen: {
      borderTopColor: config.styles.light.primaryBorderColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    screen: {
      borderTopColor: config.styles.dark.primaryBorderColor,
    },
  }),
);
