import { TestBed } from '@angular/core/testing';

import { CurriculumCrudService } from './curriculum-crud.service';

describe('CurriculumCrudService', () => {
  let service: CurriculumCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
