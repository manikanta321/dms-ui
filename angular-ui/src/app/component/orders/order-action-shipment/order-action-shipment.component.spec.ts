import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActionShipmentComponent } from './order-action-shipment.component';

describe('OrderActionShipmentComponent', () => {
  let component: OrderActionShipmentComponent;
  let fixture: ComponentFixture<OrderActionShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderActionShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderActionShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
