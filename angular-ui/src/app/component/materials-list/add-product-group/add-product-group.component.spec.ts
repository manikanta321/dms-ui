import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductGroupComponent } from './add-product-group.component';

describe('AddProductGroupComponent', () => {
  let component: AddProductGroupComponent;
  let fixture: ComponentFixture<AddProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
