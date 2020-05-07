import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from '../tracks/tracks.actions';
import { setValueAtTickForTrack } from './rhythmic-patterns.actions';

export interface RhythmicPattern {
  pattern: boolean[];
}

export interface RhythmicPatternsState {
  byTrackId: {
    [trackId: string]: RhythmicPattern;
  };
}

export const initialState = {
  byTrackId: {}
};

const _rhythmicPatternsReducer = createReducer(
  initialState,
  on(createTrack, (state: RhythmicPatternsState, { id }) => ({
    ...state,
    byTrackId: {
      ...state.byTrackId,
      [id]: { pattern: Array(16).fill(false) }
    }
  })),
  on(
    setValueAtTickForTrack,
    (state: RhythmicPatternsState, { value, tick, trackId }) => ({
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

export function rhythmicPatternsReducer(
  state: RhythmicPatternsState | undefined,
  action: Action
) {
  return _rhythmicPatternsReducer(state, action);
}
