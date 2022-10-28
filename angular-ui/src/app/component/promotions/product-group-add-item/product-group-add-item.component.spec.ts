import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupAddItemComponent } from './product-group-add-item.component';

describe('ProductGroupAddItemComponent', () => {
  let component: ProductGroupAddItemComponent;
  let fixture: ComponentFixture<ProductGroupAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGroupAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGroupAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
