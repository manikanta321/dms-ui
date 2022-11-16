import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOrderBulkDownloadComponent } from './ship-order-bulk-download.component';

describe('ShipOrderBulkDownloadComponent', () => {
  let component: ShipOrderBulkDownloadComponent;
  let fixture: ComponentFixture<ShipOrderBulkDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOrderBulkDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipOrderBulkDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
