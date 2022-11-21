import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBulkUploadComponent } from './sales-bulk-upload.component';

describe('SalesBulkUploadComponent', () => {
  let component: SalesBulkUploadComponent;
  let fixture: ComponentFixture<SalesBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesBulkUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
