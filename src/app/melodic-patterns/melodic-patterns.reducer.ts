import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from '../tracks/tracks.actions';
import { setValueForToneAtTickForTrack } from './melodic-patterns.actions';

export interface MelodicPattern {
  pattern: {
    [tone: number]: boolean;
  }[];
}

export interface MelodicPatternsState {
  byTrackId: {
    [trackId: string]: MelodicPattern;
  };
}

export const initialState = {
  byTrackId: {}
};

const _melodicPatternsReducer = createReducer(
  initialState,
  on(createTrack, (state: MelodicPatternsState, { id }) => ({
    ...state,
    byTrackId: {
      ...state.byTrackId,
      [id]: { pattern: Array(16).fill({}) }
    }
  })),
  on(
    setValueForToneAtTickForTrack,
    (state: MelodicPatternsState, { value, tone, tick, trackId }) => ({
      ...state,
      byTrackId: {
        ...state.byTrackId,
        [trackId]: {
          ...state.byTrackId[trackId],
          pattern: state.byTrackId[trackId].pattern.map(
            (currentTick, tickIndex) => {
              if (tickIndex == tick) {
                return {
                  ...currentTick,
                  [tone]: value
                };
              }
              return currentTick;
            }
          )
        }
      }
    })
  )
);

export function melodicPatternsReducer(
  state: MelodicPatternsState | undefined,
  action: Action
) {
  return _melodicPatternsReducer(state, action);
}
