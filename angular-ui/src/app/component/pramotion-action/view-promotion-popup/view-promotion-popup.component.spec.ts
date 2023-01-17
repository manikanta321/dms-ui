import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromotionPopupComponent } from './view-promotion-popup.component';

describe('ViewPromotionPopupComponent', () => {
  let component: ViewPromotionPopupComponent;
  let fixture: ComponentFixture<ViewPromotionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPromotionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPromotionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
