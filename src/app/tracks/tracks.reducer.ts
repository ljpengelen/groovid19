import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from './tracks.actions';

export interface Track {
  id: string;
}

export interface State {
  byId: { [id: string]: Track };
}

export const initialState = {
  byId: {}
};

const _tracksReducer = createReducer(
  initialState,
  on(createTrack, (state: State, { id }) => ({
    ...state,
    byId: { ...state.byId, [id]: { id } }
  }))
);

export function tracksReducer(state: State | undefined, action: Action) {
  return _tracksReducer(state, action);
}
