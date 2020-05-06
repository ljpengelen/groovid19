import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RhythmicPatternsState } from '../rhythmic-patterns/rhythmic-patterns.reducer';

@Component({
  selector: 'app-rhythmic-key-pad',
  templateUrl: './rhythmic-key-pad.component.html',
  styleUrls: ['./rhythmic-key-pad.component.scss']
})
export class RhythmicKeyPadComponent implements OnInit {
  @Input() trackId: string;

  ticks: number[] = [];

  constructor(
    private store: Store<{
      rhythmicPatterns: RhythmicPatternsState;
    }>
  ) {}

  ngOnInit() {
    this.store.select('rhythmicPatterns', 'byTrackId').subscribe((patterns) => {
      const pattern = patterns[this.trackId].pattern;
      this.ticks = [...pattern.keys()];
    });
  }
}
