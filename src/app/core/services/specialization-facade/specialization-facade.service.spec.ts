import { TestBed } from '@angular/core/testing';

import { SpecializationFacadeService } from './specialization-facade.service';

describe('SpecializationFacadeService', () => {
  let service: SpecializationFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
