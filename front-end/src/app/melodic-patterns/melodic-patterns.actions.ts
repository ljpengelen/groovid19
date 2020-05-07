import { createAction, props } from '@ngrx/store';

export const setValueForToneAtTickForTrack = createAction(
  '[Melodic patterns] Set value for tone at tick for track',
  props<{ value: boolean; tone: number; tick: number; trackId: string }>()
);
