import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSignOutComponent } from './icon-sign-out.component';

describe('IconSignOutComponent', () => {
  let component: IconSignOutComponent;
  let fixture: ComponentFixture<IconSignOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSignOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
