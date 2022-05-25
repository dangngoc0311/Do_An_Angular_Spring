import { TestBed } from '@angular/core/testing';

import { UsercouponService } from './usercoupon.service';

describe('UsercouponService', () => {
  let service: UsercouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
