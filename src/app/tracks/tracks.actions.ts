import { createAction, props } from '@ngrx/store';

export const createTrack = createAction(
  '[Tracks] Create',
  props<{ id: string }>()
);

export const setVolumeForTrack = createAction(
  '[Tracks] Set volume for track',
  props<{ volume: number; trackId: string }>()
);
