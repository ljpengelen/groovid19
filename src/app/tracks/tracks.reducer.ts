import { Action, createReducer, on } from '@ngrx/store';
import {
  createTrack,
  setSwingForTrack,
  setVolumeForTrack
} from './tracks.actions';

export interface Track {
  id: string;
  swing: number;
  volume: number;
}

export interface TracksState {
  byId: { [id: string]: Track };
}

export const initialState = {
  byId: {}
};

const _tracksReducer = createReducer(
  initialState,
  on(createTrack, (state: TracksState, { id }) => ({
    ...state,
    byId: { ...state.byId, [id]: { id, swing: 50, volume: 100 } }
  })),
  on(setSwingForTrack, (state: TracksState, { swing, trackId }) => ({
    ...state,
    byId: {
      ...state.byId,
      [trackId]: {
        ...state.byId[trackId],
        swing
      }
    }
  })),
  on(setVolumeForTrack, (state: TracksState, { volume, trackId }) => ({
    ...state,
    byId: {
      ...state.byId,
      [trackId]: {
        ...state.byId[trackId],
        volume
      }
    }
  }))
);

export function tracksReducer(state: TracksState | undefined, action: Action) {
  return _tracksReducer(state, action);
}
