import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSuccessPopupComponent } from './dealer-success-popup.component';

describe('DealerSuccessPopupComponent', () => {
  let component: DealerSuccessPopupComponent;
  let fixture: ComponentFixture<DealerSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
