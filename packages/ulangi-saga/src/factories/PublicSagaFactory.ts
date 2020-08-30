/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { DatabaseFacade, ModelList } from '@ulangi/ulangi-local-database';

import { AdMobAdapter } from '../adapters/AdMobAdapter';
import { AnalyticsAdapter } from '../adapters/AnalyticsAdapter';
import { CrashlyticsAdapter } from '../adapters/CrashlyticsAdapter';
import { FacebookAdapter } from '../adapters/FacebookAdapter';
import { NetInfoAdapter } from '../adapters/NetInfoAdapter';
import { SystemThemeAdapter } from '../adapters/SystemThemeAdapter';
import { AdSaga } from '../sagas/AdSaga';
import { AppSaga } from '../sagas/AppSaga';
import { AuthSaga } from '../sagas/AuthSaga';
import { DataSharingSaga } from '../sagas/DataSharingSaga';
import { DatabaseSaga } from '../sagas/DatabaseSaga';
import { NetworkSaga } from '../sagas/NetworkSaga';
import { PublicSaga } from '../sagas/PublicSaga';
import { RemoteConfigSaga } from '../sagas/RemoteConfigSaga';
import { ThemeSaga } from '../sagas/ThemeSaga';

export class PublicSagaFactory {
  private modelList: ModelList;
  private adMob: null | AdMobAdapter;
  private analytics: null | AnalyticsAdapter;
  private crashlytics: null | CrashlyticsAdapter;
  private database: DatabaseFacade;
  private facebook: null | FacebookAdapter;
  private netInfo: null | NetInfoAdapter;
  private systemTheme: null | SystemThemeAdapter;

  public constructor(
    modelList: ModelList,
    database: DatabaseFacade,
    adMob: null | AdMobAdapter,
    analytics: null | AnalyticsAdapter,
    crashlytics: null | CrashlyticsAdapter,
    facebook: null | FacebookAdapter,
    netInfo: null | NetInfoAdapter,
    systemTheme: null | SystemThemeAdapter
  ) {
    this.modelList = modelList;
    this.database = database;
    this.adMob = adMob;
    this.analytics = analytics;
    this.crashlytics = crashlytics;
    this.facebook = facebook;
    this.netInfo = netInfo;
    this.systemTheme = systemTheme;
  }

  public createAllPublicSagas(): readonly PublicSaga[] {
    const sagas: PublicSaga[] = [
      new AppSaga(),
      new AuthSaga(
        this.database,
        this.modelList.sessionModel,
        this.modelList.userModel
      ),
      new DatabaseSaga(this.database),
      new RemoteConfigSaga(this.database, this.modelList.remoteConfigModel),
    ];

    if (this.netInfo !== null) {
      sagas.push(new NetworkSaga(this.netInfo));
    }

    if (
      this.analytics !== null &&
      this.crashlytics !== null &&
      this.facebook !== null
    ) {
      sagas.push(
        new DataSharingSaga(this.analytics, this.crashlytics, this.facebook)
      );
    }

    if (this.adMob !== null) {
      sagas.push(new AdSaga(this.adMob));
    }

    if (this.systemTheme !== null) {
      sagas.push(new ThemeSaga(this.systemTheme));
    }

    return sagas;
  }
}
