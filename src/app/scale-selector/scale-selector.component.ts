import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isNumber } from 'util';
import { setScaleForTrack } from '../tracks/tracks.actions';
import { Scale, TracksState } from '../tracks/tracks.reducer';

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
      tracks: TracksState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId').subscribe((tracks) => {
      this.selectedScale = tracks[this.trackId].scale;
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
