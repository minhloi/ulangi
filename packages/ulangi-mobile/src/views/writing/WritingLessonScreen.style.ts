/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { StyleSheet, ViewStyle } from 'react-native';

import { config } from '../../constants/config';

export interface WritingLessonScreenStyles {
  screen: ViewStyle;
}

export const baseStyles: WritingLessonScreenStyles = {
  screen: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
};

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
