import { Component } from '@angular/core';
import { GrooveBoxState } from '../groove-box/groove-box.reducer';
import { setTempo } from '../groove-box/groove-box.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tempo-selector',
  templateUrl: './tempo-selector.component.html',
  styleUrls: ['./tempo-selector.component.scss']
})
export class TempoSelectorComponent {
  tempo: number;

  constructor(private store: Store<{ grooveBox: GrooveBoxState }>) {
    store
      .select('grooveBox', 'tempo')
      .subscribe((tempo) => (this.tempo = tempo));
  }

  setTempo(tempo: number) {
    this.store.dispatch(setTempo({ tempo }));
  }
}
