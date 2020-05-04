import { Actions, createEffect, ofType } from '@ngrx/effects';
import { audioBufferCache } from './audio-buffer-cache';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { selectSampleForTrack } from '../samples/samples.actions';

@Injectable()
export class AudioBufferCacheEffects {
  playAllTracks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectSampleForTrack),
        tap((action) =>
          audioBufferCache.put(action.trackId, action.encodedSample)
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
