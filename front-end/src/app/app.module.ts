import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioBufferCacheEffects } from './audio-buffer-cache/audio-buffer-cache.effects';
import { ExporterComponent } from './exporter/exporter.component';
import { GrooveBoxComponent } from './groove-box/groove-box.component';
import { GrooveBoxEffects } from './groove-box/groove-box.effects';
import { grooveBoxReducer } from './groove-box/groove-box.reducer';
import { importState } from './importer/importer.actions';
import { ImporterComponent } from './importer/importer.component';
import { KeyPadTypeSelectorComponent } from './key-pad-type-selector/key-pad-type-selector.component';
import { MelodicKeyPadComponent } from './melodic-key-pad/melodic-key-pad.component';
import { MelodicKeyComponent } from './melodic-key/melodic-key.component';
import { melodicPatternsReducer } from './melodic-patterns/melodic-patterns.reducer';
import { RhythmicKeyPadComponent } from './rhythmic-key-pad/rhythmic-key-pad.component';
import { RhythmicKeyComponent } from './rhythmic-key/rhythmic-key.component';
import { rhythmicPatternsReducer } from './rhythmic-patterns/rhythmic-patterns.reducer';
import { SamplePlayerComponent } from './sample-player/sample-player.component';
import { SampleSelectorComponent } from './sample-selector/sample-selector.component';
import { samplesReducer } from './samples/samples.reducer';
import { ScaleSelectorComponent } from './scale-selector/scale-selector.component';
import { TempoSelectorComponent } from './tempo-selector/tempo-selector.component';
import { TrackCreatorComponent } from './track-creator/track-creator.component';
import { TrackSwingSelectorComponent } from './track-swing-selector/track-swing-selector.component';
import { TrackVolumeSelectorComponent } from './track-volume-selector/track-volume-selector.component';
import { TrackComponent } from './track/track.component';
import { TracksPlayerComponent } from './tracks-player/tracks-player.component';
import { tracksReducer } from './tracks/tracks.reducer';
import { SynchronizerComponent } from './synchronizer/synchronizer.component';

const reducers: ActionReducerMap<any> = {
  grooveBox: grooveBoxReducer,
  melodicPatterns: melodicPatternsReducer,
  rhythmicPatterns: rhythmicPatternsReducer,
  samples: samplesReducer,
  tracks: tracksReducer
};

export function localStorageSyncMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: Object.keys(reducers), rehydrate: true })(
    reducer
  );
}

export function importMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type == importState.type) {
      const stateToImport = (action as any).state;
      const nextState = {
        ...stateToImport,
        grooveBox: {
          ...stateToImport.grooveBox,
          isPlaying: false
        }
      };
      return reducer(nextState, action);
    }
    return reducer(state, action);
  };
}

const metaReducers: Array<MetaReducer<any, any>> = [
  importMetaReducer,
  localStorageSyncMetaReducer
];

@NgModule({
  declarations: [
    AppComponent,
    SampleSelectorComponent,
    GrooveBoxComponent,
    MelodicKeyPadComponent,
    MelodicKeyComponent,
    RhythmicKeyComponent,
    RhythmicKeyPadComponent,
    SamplePlayerComponent,
    TrackCreatorComponent,
    TrackComponent,
    TracksPlayerComponent,
    TempoSelectorComponent,
    TrackVolumeSelectorComponent,
    TrackSwingSelectorComponent,
    ScaleSelectorComponent,
    KeyPadTypeSelectorComponent,
    ExporterComponent,
    ImporterComponent,
    SynchronizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AudioBufferCacheEffects, GrooveBoxEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
