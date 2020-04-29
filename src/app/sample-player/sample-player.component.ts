import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent {
  private audioContext: AudioContext;
  private sample?: AudioBuffer;

  constructor(store: Store<{ samples: { encodedSample?: string } }>) {
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new audioContextClass();

    store
      .pipe(select('samples'), select('encodedSample'))
      .subscribe((encodedSample) => {
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
  }

  play() {
    if (this.sample) {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.sample;
      source.connect(this.audioContext.destination);
      source.start();
    }
  }
}
