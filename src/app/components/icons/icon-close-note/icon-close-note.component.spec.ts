import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCloseNoteComponent } from './icon-close-note.component';

describe('IconCloseNoteComponent', () => {
  let component: IconCloseNoteComponent;
  let fixture: ComponentFixture<IconCloseNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCloseNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCloseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
