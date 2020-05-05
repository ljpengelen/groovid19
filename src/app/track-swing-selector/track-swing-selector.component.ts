import { Component, Input, OnInit } from '@angular/core';
import { setSwingForTrack } from '../tracks/tracks.actions';
import { Store } from '@ngrx/store';
import { TracksState } from '../tracks/tracks.reducer';
@Component({
  selector: 'app-track-swing-selector',
  templateUrl: './track-swing-selector.component.html',
  styleUrls: ['./track-swing-selector.component.scss']
})
export class TrackSwingSelectorComponent implements OnInit {
  @Input() trackId: string;
  swing: number;

  constructor(private store: Store<{ tracks: TracksState }>) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId', this.trackId).subscribe((track) => {
      this.swing = track.swing;
    });
  }

  setSwing(swing: number) {
    this.store.dispatch(setSwingForTrack({ swing, trackId: this.trackId }));
  }
}
