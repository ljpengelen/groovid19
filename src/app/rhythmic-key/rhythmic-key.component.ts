import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setValueAtTickForTrack } from '../rhythmic-patterns/rhythmic-patterns.actions';
import { RhythmicPatternsState } from '../rhythmic-patterns/rhythmic-patterns.reducer';

@Component({
  selector: 'app-rhythmic-key',
  templateUrl: './rhythmic-key.component.html',
  styleUrls: ['./rhythmic-key.component.scss']
})
export class RhythmicKeyComponent {
  @Input() tick: number;
  @Input() trackId: string;

  checked = false;

  constructor(
    private store: Store<{
      rhythmicPatterns: RhythmicPatternsState;
    }>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select('rhythmicPatterns', 'byTrackId'))
      .subscribe((patterns) => {
        this.checked = patterns[this.trackId].pattern[this.tick];
      });
  }

  change() {
    this.store.dispatch(
      setValueAtTickForTrack({
        tick: this.tick,
        value: !this.checked,
        trackId: this.trackId
      })
    );
  }
}
