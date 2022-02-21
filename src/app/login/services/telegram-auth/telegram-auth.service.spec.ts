import { TestBed } from '@angular/core/testing';

import { TelegramAuthService } from './telegram-auth.service';

describe('TelegramAuthService', () => {
  let service: TelegramAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelegramAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
