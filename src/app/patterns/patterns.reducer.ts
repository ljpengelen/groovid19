import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from '../tracks/tracks.actions';
import { setValueAtTickForTrack } from './patterns.actions';

export interface Pattern {
  pattern: boolean[];
}

export interface PatternsState {
  byTrackId: {
    [trackId: string]: Pattern;
  };
}

export const initialState = {
  byTrackId: {}
};

const _patternsReducer = createReducer(
  initialState,
  on(createTrack, (state: PatternsState, { id }) => ({
    ...state,
    byTrackId: {
      ...state.byTrackId,
      [id]: { pattern: Array(16).fill(false) }
    }
  })),
  on(
    setValueAtTickForTrack,
    (state: PatternsState, { value, tick, trackId }) => ({
      ...state,
      byTrackId: {
        ...state.byTrackId,
        [trackId]: {
          pattern: state.byTrackId[trackId].pattern.map((item, index) => {
            if (index == tick) {
              return value;
            }
            return item;
          })
        }
      }
    })
  )
);

export function patternsReducer(
  state: PatternsState | undefined,
  action: Action
) {
  return _patternsReducer(state, action);
}
