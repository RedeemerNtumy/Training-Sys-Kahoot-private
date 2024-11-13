import { TestBed } from '@angular/core/testing';

import { ActiveNavService } from './active-nav.service';

describe('ActiveNavService', () => {
  let service: ActiveNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
