import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCheckComponent } from './icon-check.component';

describe('IconCheckComponent', () => {
  let component: IconCheckComponent;
  let fixture: ComponentFixture<IconCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
