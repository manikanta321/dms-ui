import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveCurrencyComponent } from './reactive-currency.component';

describe('ReactiveCurrencyComponent', () => {
  let component: ReactiveCurrencyComponent;
  let fixture: ComponentFixture<ReactiveCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
