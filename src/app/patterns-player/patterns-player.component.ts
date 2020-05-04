import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { togglePlayAllTracks } from '../groove-box/groove-box.actions';

@Component({
  selector: 'app-patterns-player',
  templateUrl: './patterns-player.component.html',
  styleUrls: ['./patterns-player.component.scss']
})
export class PatternsPlayerComponent implements OnInit {
  @Input() enabled: boolean;
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
