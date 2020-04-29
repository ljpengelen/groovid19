import { Component, Input } from '@angular/core';
import { setValueAtTick } from '../patterns/patterns.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent {
  @Input() tick: number;
  checked = false;

  constructor(private store: Store<{ patterns: { pattern: boolean[] } }>) {}

  ngOnInit(): void {
    this.store
      .pipe(select('patterns'), select('pattern'))
      .subscribe((pattern) => {
        this.checked = pattern[this.tick];
      });
  }

  change() {
    this.store.dispatch(
      setValueAtTick({ tick: this.tick, value: !this.checked })
    );
  }
}
