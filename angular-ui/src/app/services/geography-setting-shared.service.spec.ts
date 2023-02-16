import { TestBed } from '@angular/core/testing';

import { GeographySettingSharedService } from './geography-setting-shared.service';

describe('GeographySettingSharedService', () => {
  let service: GeographySettingSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographySettingSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
