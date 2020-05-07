import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeyPadType, TracksState } from '../tracks/tracks.reducer';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() trackId: string;

  keyPadType: KeyPadType;
  melodicKeyPad = KeyPadType.Melodic;
  rhythmicKeyPad = KeyPadType.Rhythmic;

  constructor(
    private store: Store<{
      tracks: TracksState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId').subscribe((tracks) => {
      this.keyPadType = tracks[this.trackId].keyPadType;
    });
  }
}
