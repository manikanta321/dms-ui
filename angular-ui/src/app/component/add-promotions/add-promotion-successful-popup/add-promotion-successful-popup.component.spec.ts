import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionSuccessfulPopupComponent } from './add-promotion-successful-popup.component';

describe('AddPromotionSuccessfulPopupComponent', () => {
  let component: AddPromotionSuccessfulPopupComponent;
  let fixture: ComponentFixture<AddPromotionSuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromotionSuccessfulPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPromotionSuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
