import { createAction, props } from '@ngrx/store';

export const importState = createAction(
  '[Importer] Import state',
  props<{ state: any }>()
);
