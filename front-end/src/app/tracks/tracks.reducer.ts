import { Action, createReducer, on } from '@ngrx/store';
import {
  createTrack,
  setKeyPadTypeForTrack,
  setNameForTrack,
  setScaleForTrack,
  setSwingForTrack,
  setVolumeForTrack
} from './tracks.actions';

export enum Scale {
  Major,
  NaturalMinor,
  HarmonicMinor,
  MelodicMinor
}

export enum KeyPadType {
  Melodic,
  Rhythmic
}

export interface Track {
  id: string;
  keyPadType: KeyPadType;
  name: string;
  scale: Scale;
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
    byId: {
      ...state.byId,
      [id]: {
        id,
        name: '',
        keyPadType: KeyPadType.Rhythmic,
        scale: Scale.Major,
        swing: 50,
        volume: 100
      }
    }
  })),
  on(setKeyPadTypeForTrack, (state: TracksState, { keyPadType, trackId }) => ({
    ...state,
    byId: {
      ...state.byId,
      [trackId]: {
        ...state.byId[trackId],
        keyPadType
      }
    }
  })),
  on(setNameForTrack, (state: TracksState, { name, trackId }) => ({
    ...state,
    byId: {
      ...state.byId,
      [trackId]: {
        ...state.byId[trackId],
        name
      }
    }
  })),
  on(setScaleForTrack, (state: TracksState, { scale, trackId }) => ({
    ...state,
    byId: {
      ...state.byId,
      [trackId]: {
        ...state.byId[trackId],
        scale
      }
    }
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
