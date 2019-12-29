/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ScreenName } from '@ulangi/ulangi-common/enums';
import { IObservableValue } from 'mobx';

import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableWritingFormState } from '../writing/ObservableWritingFormState';
import { ObservableWritingResult } from '../writing/ObservableWritingResult';

export class ObservableQuizWritingScreen extends ObservableScreen {
  public readonly writingFormState: ObservableWritingFormState;

  public readonly writingResult: ObservableWritingResult;

  public readonly shouldShowResult: IObservableValue<boolean>;

  public constructor(
    writingFormState: ObservableWritingFormState,
    writingResult: ObservableWritingResult,
    shouldShowResult: IObservableValue<boolean>,
    screenName: ScreenName,
    topBar: ObservableTitleTopBar
  ) {
    super(screenName, topBar);
    this.writingFormState = writingFormState;
    this.writingResult = writingResult;
    this.shouldShowResult = shouldShowResult;
  }
}
