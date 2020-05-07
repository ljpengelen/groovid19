import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPadTypeSelectorComponent } from './key-pad-type-selector.component';

describe('KeyPadTypeSelectorComponent', () => {
  let component: KeyPadTypeSelectorComponent;
  let fixture: ComponentFixture<KeyPadTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyPadTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPadTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
