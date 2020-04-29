import { Action, createReducer, on } from '@ngrx/store';
import { setValueAtTick } from './patterns.actions';

export interface State {
  pattern: boolean[];
}

export const initialState = {
  pattern: Array(16).fill(false)
};

const _patternsReducer = createReducer(
  initialState,
  on(setValueAtTick, (state: State, { tick, value }) => ({
    ...state,
    pattern: state.pattern.map((item, index) => {
      if (index == tick) {
        return value;
      }
      return item;
    })
  }))
);

export function patternsReducer(state: State | undefined, action: Action) {
  return _patternsReducer(state, action);
}
