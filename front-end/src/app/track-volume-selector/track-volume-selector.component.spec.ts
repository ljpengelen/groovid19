import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVolumeSelectorComponent } from './track-volume-selector.component';

describe('TrackVolumeSelectorComponent', () => {
  let component: TrackVolumeSelectorComponent;
  let fixture: ComponentFixture<TrackVolumeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVolumeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVolumeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
