import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoSelectorComponent } from './tempo-selector.component';

describe('TempoSelectorComponent', () => {
  let component: TempoSelectorComponent;
  let fixture: ComponentFixture<TempoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
