import { Component, OnInit } from '@angular/core';
import * as cuid from 'cuid';
import { createTrack } from '../tracks/tracks.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-track-creator',
  templateUrl: './track-creator.component.html',
  styleUrls: ['./track-creator.component.scss']
})
export class TrackCreatorComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  create(): void {
    this.store.dispatch(createTrack({ id: cuid() }));
  }
}
