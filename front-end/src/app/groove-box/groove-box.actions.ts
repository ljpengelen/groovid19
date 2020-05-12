import { createAction, props } from '@ngrx/store';

export const setTempo = createAction(
  '[Groove box] Set tempo',
  props<{ tempo: number }>()
);

export const playAllTracks = createAction(
  '[Groove box] Play all tracks',
  props<{ shouldBePlaying: boolean }>()
);
