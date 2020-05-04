import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleSelectorComponent } from './sample-selector/sample-selector.component';
import { GrooveBoxComponent } from './groove-box/groove-box.component';
import { grooveBoxReducer } from './groove-box/groove-box.reducer';
import { patternsReducer } from './patterns/patterns.reducer';
import { StoreModule } from '@ngrx/store';
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
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
