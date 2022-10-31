import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDefaultComponent } from './currency-default.component';

describe('CurrencyDefaultComponent', () => {
  let component: CurrencyDefaultComponent;
  let fixture: ComponentFixture<CurrencyDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
