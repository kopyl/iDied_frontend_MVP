import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNotesComponent } from './icon-notes.component';

describe('IconNotesComponent', () => {
  let component: IconNotesComponent;
  let fixture: ComponentFixture<IconNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
