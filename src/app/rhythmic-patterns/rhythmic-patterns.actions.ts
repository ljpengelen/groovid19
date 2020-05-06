import { createAction, props } from '@ngrx/store';

export const setValueAtTickForTrack = createAction(
  '[Rhythmic patterns] Set value at tick for track',
  props<{ value: boolean; tick: number; trackId: string }>()
);
