import { createAction, props } from '@ngrx/store';

export const setTempo = createAction(
  '[Groove box] Set tempo',
  props<{ tempo: number }>()
);

export const togglePlayAllTracks = createAction(
  '[Groove box] Toggle play all tracks'
);
