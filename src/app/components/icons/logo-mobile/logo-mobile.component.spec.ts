import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMobileComponent } from './logo-mobile.component';

describe('LogoMobileComponent', () => {
  let component: LogoMobileComponent;
  let fixture: ComponentFixture<LogoMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
