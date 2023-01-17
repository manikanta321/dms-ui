import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReceiptsBulkUploadComponent } from './order-receipts-bulk-upload.component';

describe('OrderReceiptsBulkUploadComponent', () => {
  let component: OrderReceiptsBulkUploadComponent;
  let fixture: ComponentFixture<OrderReceiptsBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReceiptsBulkUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReceiptsBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
