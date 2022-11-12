import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistActionPopupComponent } from './orderlist-action-popup.component';

describe('OrderlistActionPopupComponent', () => {
  let component: OrderlistActionPopupComponent;
  let fixture: ComponentFixture<OrderlistActionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistActionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
