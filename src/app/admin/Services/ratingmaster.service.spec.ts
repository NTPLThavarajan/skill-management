import { TestBed } from '@angular/core/testing';

import { RatingmasterService } from './ratingmaster.service';

describe('RatingmasterService', () => {
  let service: RatingmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
