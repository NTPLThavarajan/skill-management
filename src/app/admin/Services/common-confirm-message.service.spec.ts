import { TestBed } from '@angular/core/testing';

import { CommonConfirmMessageService } from './common-confirm-message.service';

describe('CommonConfirmMessageService', () => {
  let service: CommonConfirmMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonConfirmMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
