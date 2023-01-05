import { TestBed } from '@angular/core/testing';

import { SuccessErrorOpenService } from './success-error-open.service';

describe('SuccessErrorOpenService', () => {
  let service: SuccessErrorOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessErrorOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
