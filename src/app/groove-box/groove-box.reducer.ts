import { Action, createReducer, on } from '@ngrx/store';
import { togglePlayAllTracks } from './groove-box.actions';

export interface State {
  isPlaying: boolean;
}

export const initialState = {
  isPlaying: false
};

const _grooveBoxReducer = createReducer(
  initialState,
  on(togglePlayAllTracks, (state: State) => ({
    ...state,
    isPlaying: !state.isPlaying
  }))
);

export function grooveBoxReducer(state: State | undefined, action: Action) {
  return _grooveBoxReducer(state, action);
}
