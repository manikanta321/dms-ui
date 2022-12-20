import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelDonePopupComponent } from './order-cancel-done-popup.component';

describe('OrderCancelDonePopupComponent', () => {
  let component: OrderCancelDonePopupComponent;
  let fixture: ComponentFixture<OrderCancelDonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCancelDonePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCancelDonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
