import { TestBed } from '@angular/core/testing';

import { SpecializationCrudService } from './specialization-crud.service';

describe('SpecializationCrudService', () => {
  let service: SpecializationCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
