import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPlayerComponent } from './tracks-player.component';

describe('PatternsPlayerComponent', () => {
  let component: TracksPlayerComponent;
  let fixture: ComponentFixture<TracksPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TracksPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
