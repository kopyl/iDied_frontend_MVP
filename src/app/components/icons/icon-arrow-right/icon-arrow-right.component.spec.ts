import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowRightComponent } from './icon-arrow-right.component';

describe('IconArrowRightComponent', () => {
  let component: IconArrowRightComponent;
  let fixture: ComponentFixture<IconArrowRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconArrowRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrowRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
