import { createAction, props } from '@ngrx/store';

export const save = createAction(
  '[Samples] Save',
  props<{ encodedSample: string }>()
);
