import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleSelectorComponent } from './sample-selector/sample-selector.component';
import { GrooveBoxComponent } from './groove-box/groove-box.component';
import { StoreModule } from '@ngrx/store';
import { SamplePlayerComponent } from './sample-player/sample-player.component';
import { samplesReducer } from './samples/samples.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SampleSelectorComponent,
    GrooveBoxComponent,
    SamplePlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ samples: samplesReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
