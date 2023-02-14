import { TestBed } from '@angular/core/testing';

import { SharedServiceCalendarService } from './shared-service-calendar.service';

describe('SharedServiceCalendarService', () => {
  let service: SharedServiceCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
