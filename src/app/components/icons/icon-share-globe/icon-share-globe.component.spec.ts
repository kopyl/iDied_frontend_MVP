import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareGlobeComponent } from './share-globe.component';

describe('ShareGlobeComponent', () => {
  let component: ShareGlobeComponent;
  let fixture: ComponentFixture<ShareGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareGlobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
