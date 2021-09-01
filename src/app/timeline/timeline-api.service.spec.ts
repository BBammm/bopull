import { TestBed } from '@angular/core/testing';

import { TimelineApiService } from './timeline-api.service';

describe('TimelineApiService', () => {
  let service: TimelineApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
