import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceDownloadComponent } from './sales-invoice-download.component';

describe('SalesInvoiceDownloadComponent', () => {
  let component: SalesInvoiceDownloadComponent;
  let fixture: ComponentFixture<SalesInvoiceDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInvoiceDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInvoiceDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
