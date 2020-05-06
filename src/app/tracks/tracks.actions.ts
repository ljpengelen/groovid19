import { createAction, props } from '@ngrx/store';
import { Scale } from './tracks.reducer';

export const createTrack = createAction(
  '[Tracks] Create',
  props<{ id: string }>()
);

export const setNameForTrack = createAction(
  '[Tracks] Set name for track',
  props<{ name: string; trackId: string }>()
);

export const setScaleForTrack = createAction(
  '[Melodic patterns] Set scale for track',
  props<{ scale: Scale; trackId: string }>()
);

export const setSwingForTrack = createAction(
  '[Tracks] Set swing for track',
  props<{ swing: number; trackId: string }>()
);

export const setVolumeForTrack = createAction(
  '[Tracks] Set volume for track',
  props<{ volume: number; trackId: string }>()
);
