import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AudioBufferCacheEffects } from './audio-buffer-cache/audio-buffer-cache.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleSelectorComponent } from './sample-selector/sample-selector.component';
import { GrooveBoxComponent } from './groove-box/groove-box.component';
import { GrooveBoxEffects } from './groove-box/groove-box.effects';
import { grooveBoxReducer } from './groove-box/groove-box.reducer';
import { patternsReducer } from './patterns/patterns.reducer';
import { SamplePlayerComponent } from './sample-player/sample-player.component';
import { samplesReducer } from './samples/samples.reducer';
import { tracksReducer } from './tracks/tracks.reducer';
import { KeyPadComponent } from './key-pad/key-pad.component';
import { KeyComponent } from './key/key.component';
import { TrackCreatorComponent } from './track-creator/track-creator.component';
import { TrackComponent } from './track/track.component';
import { TracksPlayerComponent } from './tracks-player/tracks-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleSelectorComponent,
    GrooveBoxComponent,
    SamplePlayerComponent,
    KeyPadComponent,
    KeyComponent,
    TrackCreatorComponent,
    TrackComponent,
    TracksPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        grooveBox: grooveBoxReducer,
        patterns: patternsReducer,
        samples: samplesReducer,
        tracks: tracksReducer
      },
      {}
    ),
    EffectsModule.forRoot([AudioBufferCacheEffects, GrooveBoxEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
