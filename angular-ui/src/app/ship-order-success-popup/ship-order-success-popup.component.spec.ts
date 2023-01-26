import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOrderSuccessPopupComponent } from './ship-order-success-popup.component';

describe('ShipOrderSuccessPopupComponent', () => {
  let component: ShipOrderSuccessPopupComponent;
  let fixture: ComponentFixture<ShipOrderSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOrderSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipOrderSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
