import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExternalLinkComponent } from './icon-external-link.component';

describe('IconExternalLinkComponent', () => {
  let component: IconExternalLinkComponent;
  let fixture: ComponentFixture<IconExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconExternalLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconExternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
