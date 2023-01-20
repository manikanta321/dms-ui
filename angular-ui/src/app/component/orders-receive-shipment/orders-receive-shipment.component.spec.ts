import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReceiveShipmentComponent } from './orders-receive-shipment.component';

describe('OrdersReceiveShipmentComponent', () => {
  let component: OrdersReceiveShipmentComponent;
  let fixture: ComponentFixture<OrdersReceiveShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersReceiveShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersReceiveShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
