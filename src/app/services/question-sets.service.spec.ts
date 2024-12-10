import { TestBed } from '@angular/core/testing';

import { QuestionSetsService } from './question-sets.service';

describe('QuestionSetsService', () => {
  let service: QuestionSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
