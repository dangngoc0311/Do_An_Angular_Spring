import { TestBed } from '@angular/core/testing';

import { ReviewbookService } from './reviewbook.service';

describe('ReviewbookService', () => {
  let service: ReviewbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
