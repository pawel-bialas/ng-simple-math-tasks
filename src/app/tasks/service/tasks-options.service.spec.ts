import { TestBed } from '@angular/core/testing';

import { TasksOptionsService } from './tasks-options.service';

describe('TasksOptionsService', () => {
  let service: TasksOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
