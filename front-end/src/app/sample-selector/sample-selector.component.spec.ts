import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSelectorComponent } from './sample-selector.component';

describe('SampleSelectorComponent', () => {
  let component: SampleSelectorComponent;
  let fixture: ComponentFixture<SampleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SampleSelectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
