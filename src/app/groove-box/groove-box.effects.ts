import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { audioBufferCache } from '../audio-buffer-cache/audio-buffer-cache';
import { GainNodeCache } from '../gain-node-cache/gain-node-cache';
import { MelodicPatternsState } from '../melodic-patterns/melodic-patterns.reducer';
import { RhythmicPatternsState } from '../rhythmic-patterns/rhythmic-patterns.reducer';
import { Scale, TracksState } from '../tracks/tracks.reducer';
import { GrooveBoxState } from './groove-box.reducer';

const LOOKAHEAD_IN_SECONDS = 0.1;
const SCHEDULING_INTERVAL_IN_MS = 25;

const INTERVALS_PER_SCALE = {
  [Scale.Major]: [0, 2, 4, 5, 7, 9, 11, 12],
  [Scale.NaturalMinor]: [0, 2, 3, 5, 7, 8, 10, 12],
  [Scale.HarmonicMinor]: [0, 2, 3, 5, 7, 8, 11, 12],
  [Scale.MelodicMinor]: [0, 2, 3, 5, 7, 9, 11, 12]
};

const toOffset = (swing: number, secondsPerTick: number) =>
  ((swing - 50) / 100) * secondsPerTick;

const toPitch = (tone: string, scale: Scale) =>
  INTERVALS_PER_SCALE[scale][parseInt(tone)] * 100;

@Injectable()
export class GrooveBoxEffects {
  private isPlaying = false;
  private melodicPatterns: MelodicPatternsState;
  private rhythmicPatterns: RhythmicPatternsState;
  private tempo: number;
  private tracks: TracksState;

  private audioContext: AudioContext;
  private gainNodeCache: GainNodeCache;

  private nextNoteStartTime: number = 0;
  private currentTick: number = 0;

  private timerId: number;

  private scheduleSample(
    sample: AudioBuffer,
    volume: number,
    trackId: string,
    offset: number,
    pitch: number
  ) {
    const source = this.audioContext.createBufferSource();
    const gainNode = this.gainNodeCache.get(trackId);
    const startTime = this.nextNoteStartTime + offset;

    gainNode.gain.exponentialRampToValueAtTime(volume / 100, startTime);
    source.buffer = sample;
    source.detune.value = pitch;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    source.start(startTime);
  }

  private scheduleMelodicPatternForTrack(
    trackId: string,
    secondsPerTick: number
  ) {
    const sample = audioBufferCache.get(trackId);
    const scale = this.tracks.byId[trackId].scale;
    const tonesAtTick = this.melodicPatterns.byTrackId[trackId].pattern[
      this.currentTick
    ];
    const swing = this.tracks.byId[trackId].swing;
    const volume = this.tracks.byId[trackId].volume;

    if (sample) {
      Object.keys(tonesAtTick).forEach((tone) => {
        if (tonesAtTick[tone]) {
          let offset = 0;
          if (this.currentTick % 2 == 1) {
            offset = toOffset(swing, secondsPerTick);
          }
          this.scheduleSample(
            sample,
            volume,
            trackId,
            offset,
            toPitch(tone, scale)
          );
        }
      });
    }
  }

  private scheduleRhythmicPatternForTrack(
    trackId: string,
    secondsPerTick: number
  ) {
    const sample = audioBufferCache.get(trackId);
    const pattern = this.rhythmicPatterns.byTrackId[trackId].pattern;
    const swing = this.tracks.byId[trackId].swing;
    const volume = this.tracks.byId[trackId].volume;

    if (sample) {
      if (pattern[this.currentTick]) {
        let offset = 0;
        if (this.currentTick % 2 == 1) {
          offset = toOffset(swing, secondsPerTick);
        }
        this.scheduleSample(sample, volume, trackId, offset, 0);
      }
    }
  }

  private play() {
    const secondsPerTick = 60 / this.tempo / 4;

    while (
      this.nextNoteStartTime <
      this.audioContext.currentTime + LOOKAHEAD_IN_SECONDS
    ) {
      Object.keys(this.melodicPatterns.byTrackId).map((trackId) =>
        this.scheduleMelodicPatternForTrack(trackId, secondsPerTick)
      );
      Object.keys(this.rhythmicPatterns.byTrackId).map((trackId) =>
        this.scheduleRhythmicPatternForTrack(trackId, secondsPerTick)
      );

      this.nextNoteStartTime += secondsPerTick;

      ++this.currentTick;
      if (this.currentTick === 16) {
        this.currentTick = 0;
      }
    }

    this.timerId = window.setTimeout(
      this.play.bind(this),
      SCHEDULING_INTERVAL_IN_MS
    );
  }

  private toggle(shouldBePlaying: boolean) {
    if (this.isPlaying == shouldBePlaying) {
      return;
    }

    this.isPlaying = shouldBePlaying;

    if (!shouldBePlaying) {
      window.clearInterval(this.timerId);
    } else {
      this.nextNoteStartTime = this.audioContext.currentTime;
      this.currentTick = 0;
      this.play();
    }
  }

  playAllTracks$ = createEffect(
    () =>
      this.actions$.pipe(
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select('grooveBox'),
              this.store.select('melodicPatterns'),
              this.store.select('rhythmicPatterns'),
              this.store.select('tracks')
            )
          )
        ),
        tap((action) => {
          this.tempo = action[1].tempo;
          this.melodicPatterns = action[2];
          this.rhythmicPatterns = action[3];
          this.tracks = action[4];
          this.toggle(action[1].isPlaying);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{
      grooveBox: GrooveBoxState;
      melodicPatterns: MelodicPatternsState;
      rhythmicPatterns: RhythmicPatternsState;
      tracks: TracksState;
    }>
  ) {
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new audioContextClass();
    this.gainNodeCache = new GainNodeCache(this.audioContext);
  }
}
