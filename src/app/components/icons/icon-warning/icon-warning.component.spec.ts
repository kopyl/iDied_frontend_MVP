import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWarningComponent } from './icon-warning.component';

describe('IconWarningComponent', () => {
  let component: IconWarningComponent;
  let fixture: ComponentFixture<IconWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
