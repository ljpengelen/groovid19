import { createAction, props } from '@ngrx/store';

export const setValueAtTickForTrack = createAction(
  '[Patterns] Set value at tick for track',
  props<{ value: boolean; tick: number; trackId: string }>()
);
