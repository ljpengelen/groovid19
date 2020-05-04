import { Action, createReducer, on } from '@ngrx/store';
import { togglePlayAllTracks } from './groove-box.actions';

export interface GrooveBoxState {
  isPlaying: boolean;
}

export const initialState = {
  isPlaying: false
};

const _grooveBoxReducer = createReducer(
  initialState,
  on(togglePlayAllTracks, (state: GrooveBoxState) => ({
    ...state,
    isPlaying: !state.isPlaying
  }))
);

export function grooveBoxReducer(
  state: GrooveBoxState | undefined,
  action: Action
) {
  return _grooveBoxReducer(state, action);
}
