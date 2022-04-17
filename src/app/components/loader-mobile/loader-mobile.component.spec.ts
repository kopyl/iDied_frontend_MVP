import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderMobileComponent } from './loader-mobile.component';

describe('LoaderMobileComponent', () => {
  let component: LoaderMobileComponent;
  let fixture: ComponentFixture<LoaderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
