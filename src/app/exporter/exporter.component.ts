import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import fileSaver from 'file-saver';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  export() {
    this.store
      .select((state) => state)
      .subscribe((state) => {
        const blob = new Blob([JSON.stringify(state)], {
          type: 'application/json'
        });
        fileSaver.saveAs(blob, 'GroovId19-' + Date.now() + '.json');
      });
  }
}
