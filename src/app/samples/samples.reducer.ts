import { Action, createReducer, on } from '@ngrx/store';
import { save } from './samples.actions';

export interface State {
  encodedSample?: string;
}

export const initialState = {};

const _samplesReducer = createReducer(
  initialState,
  on(save, (state, { encodedSample }) => ({ ...state, encodedSample }))
);

export function samplesReducer(state: State | undefined, action: Action) {
  return _samplesReducer(state, action);
}
