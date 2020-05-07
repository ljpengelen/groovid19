import { Component, Input, OnInit } from '@angular/core';
import { setVolumeForTrack } from '../tracks/tracks.actions';
import { Store } from '@ngrx/store';
import { TracksState } from '../tracks/tracks.reducer';

@Component({
  selector: 'app-track-volume-selector',
  templateUrl: './track-volume-selector.component.html',
  styleUrls: ['./track-volume-selector.component.scss']
})
export class TrackVolumeSelectorComponent implements OnInit {
  @Input() trackId: string;
  volume: number;

  constructor(private store: Store<{ tracks: TracksState }>) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId', this.trackId).subscribe((track) => {
      this.volume = track.volume;
    });
  }

  setVolume(volume: number) {
    this.store.dispatch(setVolumeForTrack({ volume, trackId: this.trackId }));
  }
}
