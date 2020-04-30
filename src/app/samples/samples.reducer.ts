import { Action, createReducer, on } from '@ngrx/store';
import { createTrack } from '../tracks/tracks.actions';
import { selectSampleForTrack } from './samples.actions';

export interface Sample {
  encodedSample?: string;
}

export interface State {
  byTrackId: {
    [trackId: string]: Sample;
  };
}

export const initialState = {
  byTrackId: {}
};

const _samplesReducer = createReducer(
  initialState,
  on(createTrack, (state, { id }) => ({
    ...state,
    byTrackId: { ...state.byTrackId, [id]: {} }
  })),
  on(selectSampleForTrack, (state, { encodedSample, trackId }) => ({
    ...state,
    byTrackId: { ...state.byTrackId, [trackId]: { encodedSample } }
  }))
);

export function samplesReducer(state: State | undefined, action: Action) {
  return _samplesReducer(state, action);
}
