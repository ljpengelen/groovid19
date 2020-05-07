import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodicKeyPadComponent } from './melodic-key-pad.component';

describe('MelodicKeyPadComponent', () => {
  let component: MelodicKeyPadComponent;
  let fixture: ComponentFixture<MelodicKeyPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelodicKeyPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodicKeyPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
