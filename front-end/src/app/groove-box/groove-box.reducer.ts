import { Action, createReducer, on } from '@ngrx/store';
import { setTempo, togglePlayAllTracks } from './groove-box.actions';

export interface GrooveBoxState {
  isPlaying: boolean;
  tempo: number;
}

export const initialState = {
  isPlaying: false,
  tempo: 120
};

const _grooveBoxReducer = createReducer(
  initialState,
  on(togglePlayAllTracks, (state: GrooveBoxState) => ({
    ...state,
    isPlaying: !state.isPlaying
  })),
  on(setTempo, (state: GrooveBoxState, { tempo }) => ({
    ...state,
    tempo
  }))
);

export function grooveBoxReducer(
  state: GrooveBoxState | undefined,
  action: Action
) {
  return _grooveBoxReducer(state, action);
}
