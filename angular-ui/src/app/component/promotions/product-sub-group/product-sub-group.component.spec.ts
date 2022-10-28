import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubGroupComponent } from './product-sub-group.component';

describe('ProductSubGroupComponent', () => {
  let component: ProductSubGroupComponent;
  let fixture: ComponentFixture<ProductSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
