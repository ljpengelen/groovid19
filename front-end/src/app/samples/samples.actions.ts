import { createAction, props } from '@ngrx/store';

export const selectSampleForTrack = createAction(
  '[Samples] Select sample for track',
  props<{ encodedSample: string; trackId: string }>()
);
