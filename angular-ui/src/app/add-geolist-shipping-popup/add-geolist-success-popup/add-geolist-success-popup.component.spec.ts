import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeolistSuccessPopupComponent } from './add-geolist-success-popup.component';

describe('AddGeolistSuccessPopupComponent', () => {
  let component: AddGeolistSuccessPopupComponent;
  let fixture: ComponentFixture<AddGeolistSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeolistSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeolistSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
