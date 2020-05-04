import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { togglePlayAllTracks } from '../groove-box/groove-box.actions';

@Component({
  selector: 'app-tracks-player',
  templateUrl: './tracks-player.component.html',
  styleUrls: ['./tracks-player.component.scss']
})
export class TracksPlayerComponent implements OnInit {
  @Input() isEnabled: boolean;
  isPlaying = false;

  constructor(
    private store: Store<{
      grooveBox: { isPlaying: boolean };
    }>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select('grooveBox', 'isPlaying')).subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
    });
  }

  toggle(): void {
    this.store.dispatch(togglePlayAllTracks());
  }
}
