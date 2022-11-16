import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersShipmentComponent } from './orders-shipment.component';

describe('OrdersShipmentComponent', () => {
  let component: OrdersShipmentComponent;
  let fixture: ComponentFixture<OrdersShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
