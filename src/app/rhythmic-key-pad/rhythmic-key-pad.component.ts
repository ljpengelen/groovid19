import { Component, Input, OnInit } from '@angular/core';
import { Pattern } from '../patterns/patterns.reducer';
import { Store, select } from '@ngrx/store';

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
      patterns: { byTrackId: { [trackId: string]: Pattern } };
    }>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select('patterns'), select('byTrackId'))
      .subscribe((patterns) => {
        const pattern = patterns[this.trackId].pattern;
        this.ticks = [...pattern.keys()];
      });
  }
}
