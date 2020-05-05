import { Component, Input, OnInit } from '@angular/core';
import { withoutPrefix } from '../lib/data-url';
import { Store } from '@ngrx/store';
import { selectSampleForTrack } from '../samples/samples.actions';
import { setNameForTrack } from '../tracks/tracks.actions';
import { TracksState } from '../tracks/tracks.reducer';

@Component({
  selector: 'app-sample-selector',
  templateUrl: './sample-selector.component.html',
  styleUrls: ['./sample-selector.component.scss']
})
export class SampleSelectorComponent implements OnInit {
  @Input() trackId: string;
  name: string;

  constructor(private store: Store<{ tracks: TracksState }>) {}

  ngOnInit(): void {
    this.store.select('tracks', 'byId').subscribe((tracks) => {
      this.name = tracks[this.trackId].name;
    });
  }

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
      this.store.dispatch(
        setNameForTrack({ name: files[0].name, trackId: this.trackId })
      );
    }
  }
}
