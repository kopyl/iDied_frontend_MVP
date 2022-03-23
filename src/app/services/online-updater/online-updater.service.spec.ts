import { TestBed } from '@angular/core/testing';

import { OnlineUpdaterService } from './online-updater.service';

describe('OnlineUpdaterService', () => {
  let service: OnlineUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
