import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsPromotionComponent } from './add-items-promotion.component';

describe('AddItemsPromotionComponent', () => {
  let component: AddItemsPromotionComponent;
  let fixture: ComponentFixture<AddItemsPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemsPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
