import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoAddedPopupComponent } from './geo-added-popup.component';

describe('GeoAddedPopupComponent', () => {
  let component: GeoAddedPopupComponent;
  let fixture: ComponentFixture<GeoAddedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoAddedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoAddedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
