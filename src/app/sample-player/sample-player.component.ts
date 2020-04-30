import { Component, Input, OnInit } from '@angular/core';
import { Pattern } from '../patterns/patterns.reducer';
import { Sample } from '../samples/samples.reducer';
import { Store, select } from '@ngrx/store';

const LOOKAHEAD_IN_SECONDS = 0.1;
const SCHEDULING_INTERVAL_IN_MS = 25;

const BEATS_PER_MINUTE = 120;
const SECONDS_PER_TICK = 60 / BEATS_PER_MINUTE / 4;

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent implements OnInit {
  @Input() trackId: string;

  private audioContext: AudioContext;
  private sample?: AudioBuffer;
  private pattern: boolean[];

  private isPlaying: boolean = false;
  private timerId: number;

  private nextNoteStartTime: number = 0;
  private currentTick: number = 0;

  constructor(
    private store: Store<{
      patterns: { byTrackId: { [id: string]: Pattern } };
      samples: { byTrackId: { [id: string]: Sample } };
    }>
  ) {}

  ngOnInit() {
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new audioContextClass();

    this.store
      .pipe(select('samples'), select('byTrackId'))
      .subscribe((samples) => {
        const encodedSample = samples[this.trackId].encodedSample;

        if (encodedSample) {
          const a = encodedSample.substr(encodedSample.indexOf(',') + 1);
          const b = atob(a);
          const ab = Uint8Array.from(b, (ch) => ch.charCodeAt(0)).buffer;

          this.audioContext.decodeAudioData(
            ab,
            (buffer) => (this.sample = buffer),
            (e) => console.error('Error with decoding audio data ' + e.message)
          );
        }
      });

    this.store
      .pipe(select('patterns'), select('byTrackId'))
      .subscribe((patterns) => (this.pattern = patterns[this.trackId].pattern));
  }

  private scheduleSample(startTime: number) {
    if (this.sample) {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.sample;
      source.connect(this.audioContext.destination);
      source.start(startTime);
    }
  }

  private scheduleSamples(): void {
    while (
      this.nextNoteStartTime <
      this.audioContext.currentTime + LOOKAHEAD_IN_SECONDS
    ) {
      if (this.pattern[this.currentTick]) {
        this.scheduleSample(this.nextNoteStartTime);
      }

      this.nextNoteStartTime += SECONDS_PER_TICK;

      ++this.currentTick;
      if (this.currentTick === 16) {
        this.currentTick = 0;
      }
    }

    this.timerId = window.setTimeout(
      this.scheduleSamples.bind(this),
      SCHEDULING_INTERVAL_IN_MS
    );
  }

  play() {
    if (this.isPlaying) {
      window.clearTimeout(this.timerId);
      this.isPlaying = false;
      return;
    }

    this.nextNoteStartTime = this.audioContext.currentTime;
    this.currentTick = 0;
    this.isPlaying = true;
    this.scheduleSamples();
  }
}
