import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsPlayerComponent } from './patterns-player.component';

describe('PatternsPlayerComponent', () => {
  let component: PatternsPlayerComponent;
  let fixture: ComponentFixture<PatternsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
