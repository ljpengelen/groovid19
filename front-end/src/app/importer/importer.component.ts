import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { importState } from './importer.actions';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent {
  constructor(private store: Store) {}

  import(files: FileList) {
    if (files.length === 1) {
      console.log(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        let state;
        try {
          this.store.dispatch(
            importState({ state: JSON.parse(reader.result as string) })
          );
        } catch (e) {
          console.error('Unable to parse imported state: ' + e);
        }
      };
      reader.readAsText(files[0]);
    }
  }
}
