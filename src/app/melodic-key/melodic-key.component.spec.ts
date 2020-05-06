import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodicKeyComponent } from './melodic-key.component';

describe('MelodicKeyComponent', () => {
  let component: MelodicKeyComponent;
  let fixture: ComponentFixture<MelodicKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelodicKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
