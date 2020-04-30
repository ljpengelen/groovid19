import { Component, Input, OnInit } from '@angular/core';
import { Pattern } from '../patterns/patterns.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent implements OnInit {
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
