import { TestBed } from '@angular/core/testing';

import { CustomerguardGuard } from './customerguard.guard';

describe('CustomerguardGuard', () => {
  let guard: CustomerguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
