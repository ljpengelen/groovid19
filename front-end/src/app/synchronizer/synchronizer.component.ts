import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  startSynchronizing,
  stopSynchronizing
} from '../groove-box/groove-box.actions';

@Component({
  selector: 'app-synchronizer',
  templateUrl: './synchronizer.component.html',
  styleUrls: ['./synchronizer.component.scss']
})
export class SynchronizerComponent implements OnInit {
  isSynchronizing = false;

  constructor(
    private store: Store<{
      grooveBox: { isSynchronizing: boolean };
    }>
  ) {}

  ngOnInit(): void {
    this.store
      .select('grooveBox', 'isSynchronizing')
      .subscribe((isSynchronizing) => {
        this.isSynchronizing = isSynchronizing;
      });
  }

  toggleSynchronization() {
    if (this.isSynchronizing) {
      this.store.dispatch(stopSynchronizing());
    } else {
      this.store.dispatch(startSynchronizing());
    }
  }
}
