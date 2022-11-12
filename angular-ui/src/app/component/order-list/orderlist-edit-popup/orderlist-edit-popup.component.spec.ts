import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistEditPopupComponent } from './orderlist-edit-popup.component';

describe('OrderlistEditPopupComponent', () => {
  let component: OrderlistEditPopupComponent;
  let fixture: ComponentFixture<OrderlistEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistEditPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
