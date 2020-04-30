import { createAction, props } from '@ngrx/store';

export const createTrack = createAction(
  '[Tracks] Create',
  props<{ id: string }>()
);
