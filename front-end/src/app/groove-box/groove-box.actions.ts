import { createAction, props } from '@ngrx/store';

export const startSynchronizing = createAction(
  '[Groove box] Start synchronizing'
);

export const stopSynchronizing = createAction(
  '[Groove box] Stop synchronizing'
);

export const setIsSynchronizing = createAction(
  '[Groove box] Set synchronization',
  props<{ isSynchronizing: boolean }>()
);

export const setTempo = createAction(
  '[Groove box] Set tempo',
  props<{ tempo: number }>()
);

export const playAllTracks = createAction(
  '[Groove box] Play all tracks',
  props<{ isPlaying: boolean }>()
);
