import { TestBed } from '@angular/core/testing';

import { FaleConoscoService } from './fale-conosco.service';

describe('FaleConoscoService', () => {
  let service: FaleConoscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaleConoscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
