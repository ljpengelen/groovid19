import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { save } from '../samples/samples.actions';

@Component({
  selector: 'app-sample-selector',
  templateUrl: './sample-selector.component.html',
  styleUrls: ['./sample-selector.component.scss']
})
export class SampleSelectorComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  storeSample(files: FileList) {
    if (files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result);
        this.store.dispatch(
          save({ encodedSample: fileReader.result as string })
        );
      };
      fileReader.readAsDataURL(files[0]);

      const otherFileReader = new FileReader();
      otherFileReader.onload = () => {
        console.log(otherFileReader.result);
      };
      otherFileReader.readAsArrayBuffer(files[0]);
    }
  }
}
