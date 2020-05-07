import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSwingSelectorComponent } from './track-swing-selector.component';

describe('TrackSwingSelectorComponent', () => {
  let component: TrackSwingSelectorComponent;
  let fixture: ComponentFixture<TrackSwingSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackSwingSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSwingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
