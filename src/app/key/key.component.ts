import { Component, Input } from '@angular/core';
import { setValueAtTickForTrack } from '../patterns/patterns.actions';
import { Pattern } from '../patterns/patterns.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent {
  @Input() tick: number;
  @Input() trackId: string;

  checked = false;

  constructor(
    private store: Store<{
      patterns: { byTrackId: { [trackId: string]: Pattern } };
    }>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select('patterns'), select('byTrackId'))
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
