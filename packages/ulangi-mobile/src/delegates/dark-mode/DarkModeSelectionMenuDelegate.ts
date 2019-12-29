/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Options } from '@ulangi/react-native-navigation';
import { DarkModeTrigger } from '@ulangi/ulangi-common/enums';
import { SelectionItem } from '@ulangi/ulangi-common/interfaces';
import * as _ from 'lodash';

import { NavigatorDelegate } from '../navigator/NavigatorDelegate';

export class DarkModeSelectionMenuDelegate {
  private navigatorDelegate: NavigatorDelegate;
  private styles: {
    light: Options;
    dark: Options;
  };

  public constructor(
    navigatorDelegate: NavigatorDelegate,
    styles: {
      light: Options;
      dark: Options;
    },
  ) {
    this.navigatorDelegate = navigatorDelegate;
    this.styles = styles;
  }

  public show(
    currentTrigger: DarkModeTrigger,
    onSelect: (trigger: DarkModeTrigger) => void,
  ): void {
    this.navigatorDelegate.showSelectionMenu(
      {
        title: 'Select',
        items: new Map(
          _.toPairs(DarkModeTrigger).map(
            ([, trigger]): [string, SelectionItem] => {
              return [
                trigger,
                {
                  text: trigger,
                  onPress: (): void => {
                    onSelect(trigger as DarkModeTrigger);
                    this.navigatorDelegate.dismissLightBox();
                  },
                },
              ];
            },
          ),
        ),
        selectedIds: [currentTrigger],
      },
      this.styles,
    );
  }
}
