/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Navigation, Options } from '@ulangi/react-native-navigation';
import * as _ from 'lodash';
import { Platform } from 'react-native';

import { config } from '../constants/config';

export function setupNavigationDefaultOptions(): void {
  const common: Options = {
    statusBar: {
      style: 'light',
    },
    topBar: {
      noBorder: true,
      backButton: {
        visible: false,
      },
      title: {
        fontFamily:
          Platform.OS === 'android'
            ? config.styles.androidMainFontBold
            : config.styles.iosMainFontBold,
      },
    },
    popGesture: true,
    bottomTab: {
      selectedIconColor: config.styles.primaryColor,
      selectedTextColor: config.styles.primaryColor,
    },
    layout: {
      orientation: ['portrait'],
    },
  };

  const iOSOnly: Options = {};

  const androidOnly: Options = {
    statusBar: {
      backgroundColor: config.styles.darkPrimaryColor,
    },
    topBar: {
      elevation: 0,
      title: {
        alignment: 'center',
      },
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
  };

  Navigation.setDefaultOptions(
    _.merge(common, Platform.OS === 'android' ? androidOnly : iOSOnly),
  );
}
