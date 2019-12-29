/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { SetFormPickerType } from '@ulangi/ulangi-common/enums';
import { boundClass } from 'autobind-decorator';

import { LightBoxDialogIds } from '../../constants/ids/LightBoxDialogIds';
import { DialogDelegate } from '../dialog/DialogDelegate';
import { NavigatorDelegate } from '../navigator/NavigatorDelegate';
import { PickerDelegate } from './PickerDelegate';
import { SetFormDelegate } from './SetFormDelegate';

@boundClass
export class AddEditSetScreenDelegate {
  protected setFormDelegate: SetFormDelegate;
  protected pickerDelegate: PickerDelegate;
  protected dialogDelegate: DialogDelegate;
  protected navigatorDelegate: NavigatorDelegate;

  public constructor(
    setFormDelegate: SetFormDelegate,
    pickerDelegate: PickerDelegate,
    dialogDelegate: DialogDelegate,
    navigatorDelegate: NavigatorDelegate,
  ) {
    this.setFormDelegate = setFormDelegate;
    this.pickerDelegate = pickerDelegate;
    this.dialogDelegate = dialogDelegate;
    this.navigatorDelegate = navigatorDelegate;
  }

  public showPicker(pickerType: SetFormPickerType): void {
    this.pickerDelegate.showPicker(pickerType);
  }

  public hidePicker(): void {
    this.pickerDelegate.hidePicker();
  }

  public handleLanguageSelected(languageCode: string): void {
    this.setFormDelegate.handleLanguageSelected(languageCode);
  }

  public showLanguageNotSelectedDialog(
    languageType: 'learningLanguage' | 'translatedToLanguage',
  ): void {
    this.dialogDelegate.show({
      message:
        languageType === 'learningLanguage'
          ? 'Please select a language you want to learn.'
          : 'Please select a language you want to translate to.',
      showCloseButton: true,
      closeOnTouchOutside: true,
    });
  }

  public showSelectLearningLanguageFirstDialog(): void {
    this.dialogDelegate.show({
      message: 'Please select a language you want to learn first.',
      showCloseButton: true,
      closeOnTouchOutside: true,
    });
  }

  public showSavingDialog(): void {
    this.dialogDelegate.show({
      message: 'Saving. Please wait...',
    });
  }

  public showSaveSucceededDialog(): void {
    this.dialogDelegate.showSuccessDialog({
      testID: LightBoxDialogIds.SUCCESS_DIALOG,
      message: 'Saved successfully.',
      showCloseButton: true,
      closeOnTouchOutside: true,
      onClose: (): void => {
        this.navigatorDelegate.pop();
      },
    });
  }

  public showSaveFailedDialog(errorCode: string): void {
    this.dialogDelegate.showFailedDialog(errorCode, {
      testID: LightBoxDialogIds.FAILED_DIALOG,
      title: 'SAVE FAILED',
      showCloseButton: true,
      closeOnTouchOutside: true,
    });
  }

  public readonly submit?: () => void = undefined;
}
