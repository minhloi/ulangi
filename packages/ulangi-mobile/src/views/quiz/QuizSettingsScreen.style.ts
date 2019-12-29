/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { StyleSheet, ViewStyle } from 'react-native';

import {
  darkStyles as defaultSectionRowDarkStyles,
  lightStyles as defaultSectionRowLightStyles,
} from '../section/SectionRow.style';

export interface QuizSettingsScreenStyles {
  screen: ViewStyle;
  content_container: ViewStyle;
}

export const baseStyles: QuizSettingsScreenStyles = {
  screen: {
    flex: 1,
  },

  content_container: {
    paddingTop: 16,
  },
};

export const lightStyles = StyleSheet.create(_.merge({}, baseStyles, {}));

export const darkStyles = StyleSheet.create(_.merge({}, baseStyles, {}));

export const sectionRowLightStyles = StyleSheet.create(
  _.merge({}, defaultSectionRowLightStyles, {
    left_text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  }),
);

export const sectionRowDarkStyles = StyleSheet.create(
  _.merge({}, defaultSectionRowDarkStyles, {
    left_text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  }),
);
