import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconHideKeyboardComponent } from './icon-hide-keyboard.component';

describe('IconHideKeyboardComponent', () => {
  let component: IconHideKeyboardComponent;
  let fixture: ComponentFixture<IconHideKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconHideKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconHideKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
