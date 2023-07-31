import { TestBed } from '@angular/core/testing';

import { AceiteCookiesService } from './aceite-cookies.service';

describe('AceiteCookiesService', () => {
  let service: AceiteCookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AceiteCookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
