import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShortCodeComponent } from './product-short-code.component';

describe('ProductShortCodeComponent', () => {
  let component: ProductShortCodeComponent;
  let fixture: ComponentFixture<ProductShortCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShortCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShortCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
