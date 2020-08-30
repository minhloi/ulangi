/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ScreenName } from '@ulangi/ulangi-common/enums';

import { NavigatorDelegate } from '../navigator/NavigatorDelegate';

export class LevelBreakdownDelegate {
  private navigatorDelegate: NavigatorDelegate;
  public constructor(
    navigatorDelegate: NavigatorDelegate,
  ) {
    this.navigatorDelegate = navigatorDelegate;
  }

  public show(levelCounts: {
    readonly totalCount: number;
    readonly level0Count: number;
    readonly level1To3Count: number;
    readonly level4To6Count: number;
    readonly level7To8Count: number;
    readonly level9To10Count: number;
  }): void {
    this.navigatorDelegate.showLightBox(
      ScreenName.LEVEL_BREAKDOWN_SCREEN,
      {
        levelCounts,
      },
    );
  }
}
