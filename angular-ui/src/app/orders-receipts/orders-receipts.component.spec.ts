import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReceiptsComponent } from './orders-receipts.component';

describe('OrdersReceiptsComponent', () => {
  let component: OrdersReceiptsComponent;
  let fixture: ComponentFixture<OrdersReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
