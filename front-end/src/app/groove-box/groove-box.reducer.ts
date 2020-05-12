import { Action, createReducer, on } from '@ngrx/store';
import { playAllTracks, setTempo } from './groove-box.actions';

export interface GrooveBoxState {
  isPlaying: boolean;
  isSynchronizing: boolean;
  tempo: number;
}

export const initialState = {
  isPlaying: false,
  isSynchronizing: false,
  tempo: 120
};

const _grooveBoxReducer = createReducer(
  initialState,
  on(playAllTracks, (state: GrooveBoxState, { shouldBePlaying }) => ({
    ...state,
    isPlaying: shouldBePlaying
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
