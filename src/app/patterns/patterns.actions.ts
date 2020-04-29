import { createAction, props } from '@ngrx/store';

export const setValueAtTick = createAction(
  '[Patterns] Set value at tick',
  props<{ tick: number; value: boolean }>()
);
