/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { SQLiteDatabase } from '@ulangi/sqlite-adapter';
import { DatabaseEventBus, ModelList } from '@ulangi/ulangi-local-database';

import { AudioPlayerAdapter } from '../adapters/AudioPlayerAdapter';
import { FileSystemAdapter } from '../adapters/FileSystemAdapter';
import { FirebaseAdapter } from '../adapters/FirebaseAdapter';
import { IapAdapter } from '../adapters/IapAdapter';
import { NotificationsAdapter } from '../adapters/NotificationsAdapter';
import { ApiKeySaga } from '../sagas/ApiKeySaga';
import { AtomSaga } from '../sagas/AtomSaga';
import { AudioSaga } from '../sagas/AudioSaga';
import { CategorySaga } from '../sagas/CategorySaga';
import { DictionarySaga } from '../sagas/DictionarySaga';
import { DownloadIncompatibleSetSaga } from '../sagas/DownloadIncompatibleSetSaga';
import { DownloadIncompatibleVocabularySaga } from '../sagas/DownloadIncompatibleVocabularySaga';
import { DownloadSetSaga } from '../sagas/DownloadSetSaga';
import { DownloadUserSaga } from '../sagas/DownloadUserSaga';
import { DownloadVocabularySaga } from '../sagas/DownloadVocabularySaga';
import { IapSaga } from '../sagas/IapSaga';
import { ImageSaga } from '../sagas/ImageSaga';
import { LessonResultSaga } from '../sagas/LessonResultSaga';
import { LibrarySaga } from '../sagas/LibrarySaga';
import { ManageSaga } from '../sagas/ManageSaga';
import { ObserveLocalUpdateSaga } from '../sagas/ObserveLocalUpdateSaga';
import { ObserveRemoteUpdateSaga } from '../sagas/ObserveRemoteUpdateSaga';
import { ProtectedSaga } from '../sagas/ProtectedSaga';
import { QuizSaga } from '../sagas/QuizSaga';
import { ReflexSaga } from '../sagas/ReflexSaga';
import { ReminderSaga } from '../sagas/ReminderSaga';
import { SearchSaga } from '../sagas/SearchSaga';
import { SetSaga } from '../sagas/SetSaga';
import { SpacedRepetitionSaga } from '../sagas/SpacedRepetitionSaga';
import { StatisticsSaga } from '../sagas/StatisticsSaga';
import { SyncSaga } from '../sagas/SyncSaga';
import { TranslationSaga } from '../sagas/TranslationSaga';
import { UploadSetSaga } from '../sagas/UploadSetSaga';
import { UploadUserSaga } from '../sagas/UploadUserSaga';
import { UploadVocabularySaga } from '../sagas/UploadVocabularySaga';
import { UserSaga } from '../sagas/UserSaga';
import { VocabularySaga } from '../sagas/VocabularySaga';
import { WritingSaga } from '../sagas/WritingSaga';

export class ProtectedSagaFactory {
  private modelList: ModelList;
  private databaseEventBus: DatabaseEventBus;
  private sharedDb: SQLiteDatabase;
  private userDb: SQLiteDatabase;

  private audioPlayer: null | AudioPlayerAdapter;
  private fileSystem: null | FileSystemAdapter;
  private firebase: null | FirebaseAdapter;
  private iap: null | IapAdapter;
  private notifications: null | NotificationsAdapter;

  public constructor(
    modelList: ModelList,
    databaseEventBus: DatabaseEventBus,
    sharedDb: SQLiteDatabase,
    userDb: SQLiteDatabase,
    audioPlayer: null | AudioPlayerAdapter,
    fileSystem: null | FileSystemAdapter,
    firebase: null | FirebaseAdapter,
    iap: null | IapAdapter,
    notifications: null | NotificationsAdapter
  ) {
    this.modelList = modelList;
    this.databaseEventBus = databaseEventBus;
    this.sharedDb = sharedDb;
    this.userDb = userDb;
    this.audioPlayer = audioPlayer;
    this.fileSystem = fileSystem;
    this.firebase = firebase;
    this.iap = iap;
    this.notifications = notifications;
  }

  public createAllProtectedSagas(): readonly ProtectedSaga[] {
    const sagas: ProtectedSaga[] = [
      new UserSaga(
        this.sharedDb,
        this.userDb,
        this.modelList.sessionModel,
        this.modelList.userModel
      ),
      new SetSaga(this.userDb, this.modelList.setModel),
      new VocabularySaga(
        this.userDb,
        this.modelList.vocabularyModel,
        this.modelList.vocabularyLocalDataModel,
        this.modelList.spacedRepetitionModel,
        this.modelList.writingModel
      ),
      new CategorySaga(this.userDb, this.modelList.categoryModel),
      new ManageSaga(
        this.userDb,
        this.modelList.categoryModel,
        this.modelList.spacedRepetitionModel,
        this.modelList.writingModel
      ),
      new SearchSaga(this.userDb, this.modelList.vocabularyModel),
      new LibrarySaga(this.sharedDb, this.modelList.sessionModel),
      new SpacedRepetitionSaga(
        this.userDb,
        this.modelList.vocabularyModel,
        this.modelList.spacedRepetitionModel,
        this.modelList.lessonResultModel
      ),
      new WritingSaga(
        this.userDb,
        this.modelList.vocabularyModel,
        this.modelList.writingModel,
        this.modelList.lessonResultModel
      ),
      new QuizSaga(
        this.userDb,
        this.modelList.vocabularyModel,
        this.modelList.quizMultipleChoiceModel,
        this.modelList.quizWritingModel
      ),
      new ReflexSaga(this.userDb, this.modelList.vocabularyModel),
      new AtomSaga(this.userDb, this.modelList.vocabularyModel),
      new DictionarySaga(this.sharedDb, this.modelList.sessionModel),
      new TranslationSaga(this.sharedDb, this.modelList.sessionModel),
      new SyncSaga(
        new UploadUserSaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.dirtyUserModel
        ),
        new UploadSetSaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.dirtySetModel
        ),
        new UploadVocabularySaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.dirtyVocabularyModel
        ),
        new DownloadUserSaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.userModel
        ),
        new DownloadSetSaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.setModel,
          this.modelList.incompatibleSetModel
        ),
        new DownloadVocabularySaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.vocabularyModel,
          this.modelList.incompatibleVocabularyModel
        ),
        new DownloadIncompatibleSetSaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.setModel,
          this.modelList.incompatibleSetModel
        ),
        new DownloadIncompatibleVocabularySaga(
          this.userDb,
          this.sharedDb,
          this.modelList.sessionModel,
          this.modelList.vocabularyModel,
          this.modelList.incompatibleVocabularyModel
        )
      ),
      new ObserveLocalUpdateSaga(this.databaseEventBus),
      new ApiKeySaga(this.sharedDb, this.modelList.sessionModel),
      new ImageSaga(this.sharedDb, this.modelList.sessionModel),
      new StatisticsSaga(this.sharedDb, this.modelList.sessionModel),
      new LessonResultSaga(
        this.userDb,
        this.sharedDb,
        this.modelList.sessionModel,
        this.modelList.lessonResultModel,
        this.databaseEventBus
      ),
    ];

    if (this.audioPlayer !== null && this.fileSystem !== null) {
      new AudioSaga(
        this.sharedDb,
        this.modelList.sessionModel,
        this.fileSystem,
        this.audioPlayer
      );
    }

    if (this.iap !== null) {
      sagas.push(
        new IapSaga(this.sharedDb, this.modelList.sessionModel, this.iap)
      );
    }

    if (this.notifications !== null) {
      sagas.push(new ReminderSaga(this.notifications));
    }

    if (this.firebase !== null) {
      sagas.push(
        new ObserveRemoteUpdateSaga(
          this.sharedDb,
          this.modelList.sessionModel,
          this.firebase
        )
      );
    }

    return sagas;
  }
}
