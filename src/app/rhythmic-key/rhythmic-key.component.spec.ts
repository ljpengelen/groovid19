import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmicKeyComponent } from './rhythmic-key.component';

describe('KeyComponent', () => {
  let component: RhythmicKeyComponent;
  let fixture: ComponentFixture<RhythmicKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicKeyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
