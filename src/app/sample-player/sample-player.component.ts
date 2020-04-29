import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent implements OnInit {
  private audioContext: AudioContext;
  private sample?: AudioBuffer;

  constructor(public store: Store<{ samples: { encodedSample?: string } }>) {
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

  ngOnInit(): void {}

  play() {
    if (this.sample) {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.sample;
      source.connect(this.audioContext.destination);
      source.start();
    }
  }
}
