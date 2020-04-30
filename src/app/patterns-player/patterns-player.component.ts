import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patterns-player',
  templateUrl: './patterns-player.component.html',
  styleUrls: ['./patterns-player.component.scss']
})
export class PatternsPlayerComponent implements OnInit {
  @Input() enabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
