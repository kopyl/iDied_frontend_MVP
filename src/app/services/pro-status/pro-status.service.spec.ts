import { TestBed } from '@angular/core/testing';

import { ProStatusService } from './pro-status.service';

describe('ProStatusService', () => {
  let service: ProStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
