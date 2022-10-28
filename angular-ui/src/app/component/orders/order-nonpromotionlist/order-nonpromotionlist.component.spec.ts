import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNonpromotionlistComponent } from './order-nonpromotionlist.component';

describe('OrderNonpromotionlistComponent', () => {
  let component: OrderNonpromotionlistComponent;
  let fixture: ComponentFixture<OrderNonpromotionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNonpromotionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderNonpromotionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
