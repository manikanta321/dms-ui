import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSubGroupComponent } from './add-product-sub-group.component';

describe('AddProductSubGroupComponent', () => {
  let component: AddProductSubGroupComponent;
  let fixture: ComponentFixture<AddProductSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductSubGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
