import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyReactivatedComponent } from './currency-reactivated.component';

describe('CurrencyReactivatedComponent', () => {
  let component: CurrencyReactivatedComponent;
  let fixture: ComponentFixture<CurrencyReactivatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyReactivatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyReactivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
