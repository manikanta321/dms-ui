import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistShipPopupComponent } from './orderlist-ship-popup.component';

describe('OrderlistShipPopupComponent', () => {
  let component: OrderlistShipPopupComponent;
  let fixture: ComponentFixture<OrderlistShipPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistShipPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistShipPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
