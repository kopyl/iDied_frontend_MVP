import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistentAlertComponent } from './persistent-alert.component';

describe('PersistentAlertComponent', () => {
  let component: PersistentAlertComponent;
  let fixture: ComponentFixture<PersistentAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersistentAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
