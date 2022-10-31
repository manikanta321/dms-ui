import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveCurrencyComponent } from './deactive-currency.component';

describe('DeactiveCurrencyComponent', () => {
  let component: DeactiveCurrencyComponent;
  let fixture: ComponentFixture<DeactiveCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
