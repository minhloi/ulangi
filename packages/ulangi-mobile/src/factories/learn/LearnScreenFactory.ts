/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { FeatureSettingsDelegate } from '../../delegates/learn/FeatureSettingsDelegate';
import { LearnScreenDelegate } from '../../delegates/learn/LearnScreenDelegate';
import { SetSelectionMenuDelegate } from '../../delegates/set/SetSelectionMenuDelegate';
import { PrimaryScreenStyle } from '../../styles/PrimaryScreenStyle';
import { ScreenFactory } from '../ScreenFactory';

export class LearnScreenFactory extends ScreenFactory {
  public createSetSelectionMenuDelegateWithStyles(): SetSelectionMenuDelegate {
    return this.createSetSelectionMenuDelegate(
      PrimaryScreenStyle.LIGHT_BOX_SCREEN_STYLES,
    );
  }

  public createScreenDelegate(): LearnScreenDelegate {
    const featureSettingsDelegate = new FeatureSettingsDelegate(
      this.props.rootStore.setStore,
    );

    return new LearnScreenDelegate(
      featureSettingsDelegate,
      this.createNavigatorDelegate(),
    );
  }
}
