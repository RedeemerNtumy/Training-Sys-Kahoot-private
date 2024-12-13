import { TestBed } from '@angular/core/testing';

import { TraineeQuizService } from './trainee-quiz.service';

describe('TraineeQuizService', () => {
  let service: TraineeQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
