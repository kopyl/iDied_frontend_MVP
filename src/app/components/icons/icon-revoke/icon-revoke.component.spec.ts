import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRevokeComponent } from './icon-revoke.component';

describe('IconRevokeComponent', () => {
  let component: IconRevokeComponent;
  let fixture: ComponentFixture<IconRevokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconRevokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
