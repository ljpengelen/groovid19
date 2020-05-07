import { audioBufferCache } from '../audio-buffer-cache/audio-buffer-cache';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent {
  @Input() trackId: string;

  private audioContext: AudioContext;

  constructor() {
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new audioContextClass();
  }

  play() {
    const sample = audioBufferCache.get(this.trackId);

    if (sample) {
      const source = this.audioContext.createBufferSource();
      source.buffer = sample;
      source.connect(this.audioContext.destination);
      source.start(0);
    }
  }
}
