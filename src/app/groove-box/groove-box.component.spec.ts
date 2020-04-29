import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrooveBoxComponent } from './groove-box.component';

describe('GrooveBoxComponent', () => {
  let component: GrooveBoxComponent;
  let fixture: ComponentFixture<GrooveBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrooveBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrooveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
