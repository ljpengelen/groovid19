import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Track } from '../tracks/tracks.reducer';

@Component({
  selector: 'app-groove-box',
  templateUrl: './groove-box.component.html',
  styleUrls: ['./groove-box.component.scss']
})
export class GrooveBoxComponent implements OnInit {
  trackIds: string[];

  constructor(store: Store<{ tracks: { byId: { [id: string]: Track } } }>) {
    store.pipe(select('tracks'), select('byId')).subscribe((tracks) => {
      this.trackIds = Object.keys(tracks);
    });
  }

  ngOnInit(): void {}
}
