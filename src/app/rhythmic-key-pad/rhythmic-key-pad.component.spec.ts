import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmicKeyPadComponent } from './rhythmic-key-pad.component';

describe('RhythmicKeyPadComponent', () => {
  let component: RhythmicKeyPadComponent;
  let fixture: ComponentFixture<RhythmicKeyPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicKeyPadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicKeyPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
