import { TestBed } from '@angular/core/testing';

import { CurriculumFacadeService } from './curriculum-facade.service';

describe('CurriculumFacadeService', () => {
  let service: CurriculumFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
