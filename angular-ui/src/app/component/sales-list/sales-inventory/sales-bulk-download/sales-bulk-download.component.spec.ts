import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBulkDownloadComponent } from './sales-bulk-download.component';

describe('SalesBulkDownloadComponent', () => {
  let component: SalesBulkDownloadComponent;
  let fixture: ComponentFixture<SalesBulkDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesBulkDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBulkDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
