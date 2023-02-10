import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeolistShippingPopupComponent } from './add-geolist-shipping-popup.component';

describe('AddGeolistShippingPopupComponent', () => {
  let component: AddGeolistShippingPopupComponent;
  let fixture: ComponentFixture<AddGeolistShippingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeolistShippingPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeolistShippingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
