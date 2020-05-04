import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from './tracks.actions';

export interface Track {
  id: string;
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
    byId: { ...state.byId, [id]: { id } }
  }))
);

export function tracksReducer(state: TracksState | undefined, action: Action) {
  return _tracksReducer(state, action);
}
