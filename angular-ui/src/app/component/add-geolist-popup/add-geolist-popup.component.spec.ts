import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeolistPopupComponent } from './add-geolist-popup.component';

describe('AddGeolistPopupComponent', () => {
  let component: AddGeolistPopupComponent;
  let fixture: ComponentFixture<AddGeolistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeolistPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeolistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
