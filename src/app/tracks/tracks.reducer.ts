import { Action, createReducer, on } from '@ngrx/store';
import { createTrack, setVolumeForTrack } from './tracks.actions';

export interface Track {
  id: string;
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
    byId: { ...state.byId, [id]: { id, volume: 100 } }
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
