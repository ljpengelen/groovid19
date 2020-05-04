import { Actions, createEffect } from '@ngrx/effects';
import { audioBufferCache } from '../audio-buffer-cache/audio-buffer-cache';
import { GrooveBoxState } from './groove-box.reducer';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PatternsState } from '../patterns/patterns.reducer';
import { Store, select } from '@ngrx/store';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

const LOOKAHEAD_IN_SECONDS = 0.1;
const SCHEDULING_INTERVAL_IN_MS = 25;

const BEATS_PER_MINUTE = 120;
const SECONDS_PER_TICK = 60 / BEATS_PER_MINUTE / 4;

@Injectable()
export class GrooveBoxEffects {
  private isPlaying = false;
  private patterns: PatternsState;

  private audioContext: AudioContext;

  private nextNoteStartTime: number = 0;
  private currentTick: number = 0;

  private timerId: number;

  private scheduleSample(sample: AudioBuffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = sample;
    source.connect(this.audioContext.destination);
    source.start(this.nextNoteStartTime);
  }

  private schedulePatternForTrack(trackId: string) {
    const sample = audioBufferCache.get(trackId);
    const pattern = this.patterns.byTrackId[trackId].pattern;

    if (sample) {
      if (pattern[this.currentTick]) {
        this.scheduleSample(sample);
      }
    }
  }

  private play() {
    while (
      this.nextNoteStartTime <
      this.audioContext.currentTime + LOOKAHEAD_IN_SECONDS
    ) {
      Object.keys(this.patterns.byTrackId).map((trackId) =>
        this.schedulePatternForTrack(trackId)
      );

      this.nextNoteStartTime += SECONDS_PER_TICK;

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
              this.store.pipe(select('grooveBox', 'isPlaying')),
              this.store.pipe(select('patterns'))
            )
          )
        ),
        tap((action) => {
          this.patterns = action[2];
          this.toggle(action[1]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{
      grooveBox: GrooveBoxState;
      patterns: PatternsState;
    }>
  ) {
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new audioContextClass();
  }
}
