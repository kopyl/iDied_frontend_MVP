import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDeleteComponent } from './icon-delete.component';

describe('IconDeleteComponent', () => {
  let component: IconDeleteComponent;
  let fixture: ComponentFixture<IconDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
