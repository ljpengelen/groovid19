import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MelodicPattern } from '../melodic-patterns/melodic-patterns.reducer';

@Component({
  selector: 'app-melodic-key-pad',
  templateUrl: './melodic-key-pad.component.html',
  styleUrls: ['./melodic-key-pad.component.scss']
})
export class MelodicKeyPadComponent implements OnInit {
  @Input() trackId: string;

  ticks: number[] = [];
  tones = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(
    private store: Store<{
      melodicPatterns: { byTrackId: { [trackId: string]: MelodicPattern } };
    }>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select('melodicPatterns'), select('byTrackId'))
      .subscribe((patterns) => {
        const pattern = patterns[this.trackId].pattern;
        this.ticks = [...pattern.keys()];
      });
  }
}
