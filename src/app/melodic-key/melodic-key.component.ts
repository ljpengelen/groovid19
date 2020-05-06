import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setValueForToneAtTickForTrack } from '../melodic-patterns/melodic-patterns.actions';
import { MelodicPatternsState } from '../melodic-patterns/melodic-patterns.reducer';

@Component({
  selector: 'app-melodic-key',
  templateUrl: './melodic-key.component.html',
  styleUrls: ['./melodic-key.component.scss']
})
export class MelodicKeyComponent {
  @Input() tick: number;
  @Input() tone: number;
  @Input() trackId: string;

  checked = false;

  constructor(
    private store: Store<{
      melodicPatterns: MelodicPatternsState;
    }>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select('melodicPatterns', 'byTrackId'))
      .subscribe((melodicPatterns) => {
        this.checked =
          melodicPatterns[this.trackId].pattern[this.tick][this.tone];
      });
  }

  change() {
    this.store.dispatch(
      setValueForToneAtTickForTrack({
        tick: this.tick,
        value: !this.checked,
        tone: this.tone,
        trackId: this.trackId
      })
    );
  }
}
