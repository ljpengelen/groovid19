import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setKeyPadTypeForTrack } from '../tracks/tracks.actions';
import { KeyPadType, TracksState } from '../tracks/tracks.reducer';

@Component({
  selector: 'app-key-pad-type-selector',
  templateUrl: './key-pad-type-selector.component.html',
  styleUrls: ['./key-pad-type-selector.component.scss']
})
export class KeyPadTypeSelectorComponent implements OnInit {
  @Input() trackId: string;

  types = Object.values(KeyPadType).filter(
    (value) => typeof value === 'number'
  );
  selectedType: KeyPadType;

  constructor(
    private store: Store<{
      tracks: TracksState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId').subscribe((tracks) => {
      this.selectedType = tracks[this.trackId].keyPadType;
    });
  }

  selectKeyPadType(keyPadType: KeyPadType) {
    this.store.dispatch(
      setKeyPadTypeForTrack({ keyPadType, trackId: this.trackId })
    );
  }

  toString: Record<KeyPadType, string> = {
    [KeyPadType.Melodic]: 'Melodic',
    [KeyPadType.Rhythmic]: 'Rhythmic'
  };
}
