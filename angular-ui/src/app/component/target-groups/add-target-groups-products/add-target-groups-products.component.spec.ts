import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTargetGroupsProductsComponent } from './add-target-groups-products.component';

describe('AddTargetGroupsProductsComponent', () => {
  let component: AddTargetGroupsProductsComponent;
  let fixture: ComponentFixture<AddTargetGroupsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTargetGroupsProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTargetGroupsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
