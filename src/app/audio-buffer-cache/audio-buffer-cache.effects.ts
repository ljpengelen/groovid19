import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { selectSampleForTrack } from '../samples/samples.actions';
import { SamplesState } from '../samples/samples.reducer';
import { audioBufferCache } from './audio-buffer-cache';

@Injectable()
export class AudioBufferCacheEffects {
  cacheSample$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectSampleForTrack),
        tap((action) =>
          audioBufferCache.put(action.trackId, action.encodedSample)
        )
      ),
    { dispatch: false }
  );

  cacheAllSamples$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        concatMap((action) =>
          of(action).pipe(withLatestFrom(this.store.pipe(select('samples'))))
        ),
        tap((action) => {
          const samples = action[1];
          Object.keys(samples.byTrackId).map((trackId) => {
            const encodedSample = samples.byTrackId[trackId].encodedSample;
            if (encodedSample) {
              audioBufferCache.put(trackId, encodedSample);
            }
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{
      samples: SamplesState;
    }>
  ) {}
}
