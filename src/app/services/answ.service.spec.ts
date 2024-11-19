import { TestBed } from '@angular/core/testing';

import { AnswService } from './answ.service';

describe('AnswService', () => {
  let service: AnswService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
