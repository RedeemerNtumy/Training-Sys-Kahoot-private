import { TestBed } from '@angular/core/testing';

import { SearchQuizService } from './search-quiz.service';

describe('SearchQuizService', () => {
  let service: SearchQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
