import { TestBed } from '@angular/core/testing';

import { TraineeFacadeService } from './trainee-facade.service';

describe('TraineeFacadeService', () => {
  let service: TraineeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
