import { createAction, props } from '@ngrx/store';
import { Scale } from './melodic-patterns.reducer';

export const setScaleForTrack = createAction(
  '[Melodic patterns] Set scale for track',
  props<{ scale: Scale; trackId: string }>()
);

export const setValueForToneAtTickForTrack = createAction(
  '[Melodic patterns] Set value for tone at tick for track',
  props<{ value: boolean; tone: number; tick: number; trackId: string }>()
);
