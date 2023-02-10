import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTargetSuccessPopupComponent } from './dealer-target-success-popup.component';

describe('DealerTargetSuccessPopupComponent', () => {
  let component: DealerTargetSuccessPopupComponent;
  let fixture: ComponentFixture<DealerTargetSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTargetSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTargetSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
