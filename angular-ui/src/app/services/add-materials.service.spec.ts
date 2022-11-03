import { TestBed } from '@angular/core/testing';

import { AddMaterialsService } from './add-materials.service';

describe('AddMaterialsService', () => {
  let service: AddMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
