import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isNumber } from 'util';
import { setScaleForTrack } from '../melodic-patterns/melodic-patterns.actions';
import {
  MelodicPatternsState,
  Scale
} from '../melodic-patterns/melodic-patterns.reducer';

@Component({
  selector: 'app-scale-selector',
  templateUrl: './scale-selector.component.html',
  styleUrls: ['./scale-selector.component.scss']
})
export class ScaleSelectorComponent implements OnInit {
  @Input() trackId: string;

  scales = Object.values(Scale).filter(isNumber);
  selectedScale: Scale;

  constructor(
    private store: Store<{
      melodicPatterns: MelodicPatternsState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.select('melodicPatterns', 'byTrackId').subscribe((patterns) => {
      this.selectedScale = patterns[this.trackId].scale;
    });
  }

  selectScale(scale: Scale) {
    this.store.dispatch(setScaleForTrack({ scale, trackId: this.trackId }));
  }

  toString: Record<Scale, string> = {
    [Scale.HarmonicMinor]: 'Harmonic minor',
    [Scale.Major]: 'Major',
    [Scale.MelodicMinor]: 'Melodic minor',
    [Scale.NaturalMinor]: 'Natural minor'
  };
}
