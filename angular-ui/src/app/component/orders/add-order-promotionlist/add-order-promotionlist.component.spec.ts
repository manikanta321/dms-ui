import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderPromotionlistComponent } from './add-order-promotionlist.component';

describe('AddOrderPromotionlistComponent', () => {
  let component: AddOrderPromotionlistComponent;
  let fixture: ComponentFixture<AddOrderPromotionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderPromotionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderPromotionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
