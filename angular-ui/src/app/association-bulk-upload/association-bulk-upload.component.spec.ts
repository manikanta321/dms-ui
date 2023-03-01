import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationBulkUploadComponent } from './association-bulk-upload.component';

describe('AssociationBulkUploadComponent', () => {
  let component: AssociationBulkUploadComponent;
  let fixture: ComponentFixture<AssociationBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationBulkUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
