import { TestBed } from '@angular/core/testing';

import { BusinessunitMasterService } from './businessunit-master.service';

describe('BusinessunitMasterService', () => {
  let service: BusinessunitMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessunitMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
