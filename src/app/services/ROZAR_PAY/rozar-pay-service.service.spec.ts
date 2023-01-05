import { TestBed } from '@angular/core/testing';

import { RozarPayServiceService } from './rozar-pay-service.service';

describe('RozarPayServiceService', () => {
  let service: RozarPayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RozarPayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
