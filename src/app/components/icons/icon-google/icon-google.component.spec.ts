import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGoogleComponent } from './icon-google.component';

describe('IconGoogleComponent', () => {
  let component: IconGoogleComponent;
  let fixture: ComponentFixture<IconGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
