import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent {
  ticks: number[] = [];

  constructor(store: Store<{ patterns: { pattern: boolean[] } }>) {
    store.pipe(select('patterns'), select('pattern')).subscribe((pattern) => {
      this.ticks = [...pattern.keys()];
    });
  }
}
