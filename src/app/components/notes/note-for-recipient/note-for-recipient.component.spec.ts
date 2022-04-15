import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteForRecipientComponent } from './note-for-recipient.component';

describe('NoteForRecipientComponent', () => {
  let component: NoteForRecipientComponent;
  let fixture: ComponentFixture<NoteForRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteForRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteForRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
