import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { audioBufferCache } from './audio-buffer-cache';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SamplesState } from '../samples/samples.reducer';
import { selectSampleForTrack } from '../samples/samples.actions';
import { select, Store } from '@ngrx/store';

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
          Object.keys(samples.byTrackId).map((trackId) =>
            audioBufferCache.put(
              trackId,
              samples.byTrackId[trackId].encodedSample
            )
          );
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
