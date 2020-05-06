import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule
} from '@ngrx/store';

import { AudioBufferCacheEffects } from './audio-buffer-cache/audio-buffer-cache.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleSelectorComponent } from './sample-selector/sample-selector.component';
import { GrooveBoxComponent } from './groove-box/groove-box.component';
import { GrooveBoxEffects } from './groove-box/groove-box.effects';
import { grooveBoxReducer } from './groove-box/groove-box.reducer';
import { MelodicKeyComponent } from './melodic-key/melodic-key.component';
import { MelodicKeyPadComponent } from './melodic-key-pad/melodic-key-pad.component';
import { rhythmicPatternsReducer } from './rhythmic-patterns/rhythmic-patterns.reducer';
import { SamplePlayerComponent } from './sample-player/sample-player.component';
import { samplesReducer } from './samples/samples.reducer';
import { tracksReducer } from './tracks/tracks.reducer';
import { RhythmicKeyComponent } from './rhythmic-key/rhythmic-key.component';
import { RhythmicKeyPadComponent } from './rhythmic-key-pad/rhythmic-key-pad.component';
import { TrackCreatorComponent } from './track-creator/track-creator.component';
import { TrackComponent } from './track/track.component';
import { TracksPlayerComponent } from './tracks-player/tracks-player.component';
import { TempoSelectorComponent } from './tempo-selector/tempo-selector.component';
import { TrackVolumeSelectorComponent } from './track-volume-selector/track-volume-selector.component';
import { TrackSwingSelectorComponent } from './track-swing-selector/track-swing-selector.component';
import { melodicPatternsReducer } from './melodic-patterns/melodic-patterns.reducer';
import { ScaleSelectorComponent } from './scale-selector/scale-selector.component';

const reducers: ActionReducerMap<any> = {
  grooveBox: grooveBoxReducer,
  melodicPatterns: melodicPatternsReducer,
  rhythmicPatterns: rhythmicPatternsReducer,
  samples: samplesReducer,
  tracks: tracksReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: Object.keys(reducers), rehydrate: true })(
    reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

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
    ScaleSelectorComponent
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
