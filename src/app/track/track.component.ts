import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() trackId: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.trackId);
  }
}
