import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDonePopupComponent } from './currency-done-popup.component';

describe('CurrencyDonePopupComponent', () => {
  let component: CurrencyDonePopupComponent;
  let fixture: ComponentFixture<CurrencyDonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDonePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
