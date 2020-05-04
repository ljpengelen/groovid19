import { Component, Input, OnInit } from '@angular/core';
import { withoutPrefix } from '../lib/data-url';
import { Store } from '@ngrx/store';
import { selectSampleForTrack } from '../samples/samples.actions';

@Component({
  selector: 'app-sample-selector',
  templateUrl: './sample-selector.component.html',
  styleUrls: ['./sample-selector.component.scss']
})
export class SampleSelectorComponent implements OnInit {
  @Input() trackId: string;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  storeSample(files: FileList) {
    if (files.length === 1) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.store.dispatch(
          selectSampleForTrack({
            encodedSample: withoutPrefix(fileReader.result as string),
            trackId: this.trackId
          })
        );
      };
      fileReader.readAsDataURL(files[0]);
    }
  }
}
