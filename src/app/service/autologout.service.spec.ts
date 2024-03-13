import { TestBed } from '@angular/core/testing';

import { AutoLogoutService } from './autologout.service';

describe('AutologoutService', () => {
  let service: AutoLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
